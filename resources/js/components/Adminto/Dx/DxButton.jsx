import { renderToString } from "react-dom/server"

const DxButton = ({ className, title, icon, onClick, badge, badgeClass, ...props }) => {
  return $("<div>").dxButton({
    hint: title,
    template: (element, content) => {
      content.addClass(`${icon} d-block`)
      if (badge) {
        content.append(renderToString(<span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${badgeClass}`}>
          {badge}
        </span>))
      }
    },
    elementAttr: {
      class: `${className} position-relative me-1 px-1 py-0 tippy-here`,
      ...props
    },
    onClick
  })
}

export default DxButton