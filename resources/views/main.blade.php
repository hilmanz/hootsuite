<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>SONAR HOOTSUITE</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min.js"></script>
        <script src="https://d2l6uygi1pgnys.cloudfront.net/jsapi/2-0/hsp.js"></script>
        <script src="{{url('bower_components/knockout/dist/knockout.js')}}"></script>
        <script src="{{url('bower_components/store/dist/store2.js')}}"></script>
        <script src="{{url('asset/js/highcharts.js')}}"></script>
        <script src="{{url('asset/js/modules/exporting.js')}}"></script>
        <script src="{{url('asset/template.js')}}"></script>
        <script src="{{url('asset/app.js')}}"></script>

        <link href="{{url('asset/sonarsuite.css')}}" type="text/css" rel="stylesheet">
    </head>

    <body>
        <div id="{{$pid}}">
      @yield('content')
        </div>
        <script>
        var pid = '{{$pid}}';
        </script>
		<script src="{{url('asset/utils.js')}}"></script>
        <script src="{{url('asset/sonar.js')}}"></script>
        <script>
        auth_url = "{{url('auth')}}";
        dashboard_url = "{{url('')}}";
        model.uid('{{$uid}}');
        model.pid('{{$pid}}');
        @if(isset($token))
        model.token('{{$token}}');
        model.loadTabContent();
        
        @endif
        </script>
    </body>
</html>