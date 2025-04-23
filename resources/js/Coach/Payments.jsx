import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '@Adminto/Table';
import ReactAppend from '@Utils/ReactAppend';
import DxButton from '@Adminto/Dx/DxButton';
import Swal from 'sweetalert2';
import Number2Currency from '../Utils/Number2Currency';
import PaymentsRest from '../Actions/Coach/PaymentsRest';
import Global from '../Utils/Global';
import Tippy from '@tippyjs/react';
import LaravelSession from '../Utils/LaravelSession';
import { Clipboard, Notify } from 'sode-extend-react';

const paymentsRest = new PaymentsRest()

const Payments = () => {
  const gridRef = useRef()
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  const handleCulqiPayment = (paymentData) => {
    setSelectedPaymentId(paymentData.id);

    Culqi.publicKey = Global.CULQI_PUBLIC_KEY;
    Culqi.options({
      style: {
        logo: `${location.origin}/assets/img/favicon.png`,
        bannerColor: '#05455A',
        buttonBackground: '#ef4444',
        menuColor: '#ef4444',
        linksColor: '#ef4444',
        priceColor: '#ef4444',
      },
      customerEmail: LaravelSession.email,
    });
    Culqi.settings({
      icon: `${Global.APP_URL}/assets/img/favicon.png`,
      title: `${Global.APP_NAME} - Pago de cuota`,
      currency: 'PEN',
      amount: paymentData.amount * 100,
      description: `Pago de cuota ${paymentData.name}`,
    });
    Culqi.open();
  };

  const handleCopyCulqiCodeClicked = (culqiCode) => {
    Clipboard.copy(culqiCode, () => Notify.add({
      icon: '/assets/img/icon.svg',
      title: 'Código copiado',
      body: 'El código de Culqi ha sido copiado al portapapeles',
      type: 'success'
    }));
  }

  useEffect(() => {
    window.culqi = async () => {
      if (Culqi.token) {
        try {
          const result = await paymentsRest.save({
            payment_id: selectedPaymentId,
            token: Culqi.token.id,
            email: Culqi.token.email,
          });

          console.log(result)

          if (!result) return $(gridRef.current).dxDataGrid('instance').refresh()

          Swal.fire('¡Éxito!', 'El pago se ha procesado correctamente', 'success');
          $(gridRef.current).dxDataGrid('instance').refresh();
          Culqi.close();
        } catch (error) {
          console.log(error)
          Swal.fire('Error', 'Hubo un error al procesar el pago', 'error');
        }
      }
    };
  }, [selectedPaymentId]);

  return (<>
    <Table gridRef={gridRef} title='Pagos' rest={paymentsRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'name',
          caption: '# Cuota',
        },
        {
          dataField: 'agreement.process_topic',
          caption: 'Acuerdo',
          width: 400,
          cellTemplate: (container, { data }) => {
            container.addClass('text-start')
            ReactAppend(container, <>
              <b className='d-block'>Acuerdo C{String(data.agreement.contract_number).padStart(3, '0')}</b>
              <span>{data.agreement.process_topic}</span>
            </>)
          }
        },
        {
          dataField: 'coachee.name',
          caption: 'Estudiante',
        },
        {
          dataField: 'amount',
          caption: 'Monto',
          cellTemplate: (container, { data }) => {
            container.text(`S/. ${Number2Currency(data.amount)}`)
          }
        },
        {
          dataField: 'due_date',
          caption: 'Pagar antes de',
          cellTemplate: (container, { data }) => {
            container.text(moment(data.due_date).format('LL'))
          }
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            if (data.status == 1) {
              ReactAppend(container, <Tippy content={`Codigo de pago: ${data.payment_code} (Clic para copiar)`}>
                <span className='badge bg-success rounded-pill' onClick={() => handleCopyCulqiCodeClicked(data.payment_code)} style={{ cursor: 'pointer' }}>Pagado</span>
              </Tippy>)
            } else if (data.status == 0) {
              ReactAppend(container, <span className='badge bg-danger rounded-pill'>Pendiente</span>)
            } else {
              ReactAppend(container, <Tippy content={data.status_message}>
                <span className='badge bg-dark rounded-pill'>Rechazado</span>
              </Tippy>)
            }
          }
        },
        // {
        //   caption: 'Acciones',
        //   cellTemplate: (container, { data }) => {
        //     container.css('text-overflow', 'unset')
        //     if (data.status == 1) return
        //     container.append(DxButton({
        //       className: 'btn btn-xs btn-soft-primary',
        //       title: 'Pagar ahora',
        //       icon: 'fas fa-credit-card',
        //       onClick: () => handleCulqiPayment(data)
        //     }))
        //   },
        //   allowFiltering: false,
        //   allowExporting: false
        // }
      ]} />
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Pagos' >
    <Payments {...properties} />
  </BaseAdminto>);
})