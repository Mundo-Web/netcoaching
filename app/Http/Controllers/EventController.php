<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use SoDe\Extend\Fetch;
use SoDe\Extend\JSON;

class EventController extends BasicController
{
    public $model = Event::class;
    public $reactView = 'Admin/Events';
    public $reactRootView = 'public';

    static function getEventsWP()
    {
        try {
            $res = new Fetch(env('ACADEMY_URl') . '/wp-json/wp/v2/sfwd-courses?_fields=id,date,link,title,yoast_head_json.og_description,status,yoast_head_json.og_image.0.url,yoast_head_json.schema.@graph.1.itemListElement.1.name&orderby=date&order=desc');
            $data = $res->text();
            $firstBracketPos = strpos($data, '[');
            dump($firstBracketPos);
            if ($firstBracketPos === false) throw new \Exception('No se encontró el primer corchete');
            $jsonText = substr($data, $firstBracketPos);
            $eventsWP = JSON::parse($jsonText);
            return $eventsWP;
        } catch (\Throwable $th) {
            return [];
        }
    }

    public function setReactViewProperties(Request $request)
    {
        $events = Event::upcoming();

        $eventsWP = [];

        try {
            $eventPP = $this->getEventsWP();
            $res = new Fetch(env('ACADEMY_URl') . '/wp-json/wp/v2/sfwd-courses?_fields=id,date,link,title,yoast_head_json.og_description,status,yoast_head_json.og_image.0.url,yoast_head_json.schema.@graph.1.itemListElement.1.name&orderby=date&order=desc');
            $data = $res->text();
            $firstBracketPos = strpos($data, '[');
            if ($firstBracketPos !== false) {
                $jsonText = substr($data, $firstBracketPos);
                $eventsPP = json_decode($jsonText, true);
                foreach ($eventsPP as $eventPP) {
                    $eventWP = [
                        'name' => $eventPP['title']['rendered'],
                        'description' => $eventPP['yoast_head_json']['og_description'] ?? 'Sin descripción',
                        'date_time' => $eventPP['date'],
                        'link' => $eventPP['link'],
                        'image' => $eventPP['yoast_head_json']['og_image'][0]['url'],
                        'type' => $eventPP['yoast_head_json']['schema']['@graph'][1]['itemListElement'][1]['name'],
                    ];
                    $eventsWP[] = $eventWP;
                }
            }
        } catch (\Throwable $th) {
            // dump($th->getMessage());
        }

        return [
            'events' => $events,
            'eventsWP' => $eventsWP,
        ];
    }
}
