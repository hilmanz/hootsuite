@extends('main')
@section('content')
<div class="hs_stream sonarstream">
    <div class="hs_topBar">
        <div class="hs_topBarContent">
            <ul class="hs_topBarControls">
                
            </ul>
            <h1 class="hs_topBarTitle logo"><img src="{{url('asset/logo_small.png')}}"></h1>
        </div><!--Top Bar-->
    </div><!--hs_topBar-->
    <div class="ss_loader center" data-bind="visible:loadingProgress">
        <div class="loader">
            <img src="asset/loader.gif">
        </div>
        <span>Please wait while we log you in</span>
    </div><!--ss_loader-->
    <div class="ss_login" data-bind="visible:loginpage">
        <div class="big_logo">
            <img src="{{url('asset/logo.png')}}">
        </div>
        <div class="msg" data-bind="visible:has_message">
            <p data-bind="text:message"></p>
        </div>
        <input type="text" name="username" placeholder="username" data-bind="textInput:inputUsername"/>
        <input type="password" name="password" placeholder="password" data-bind="textInput:inputPassword"/>
        
        <a href="#" class="btn btn-info" data-bind="click:function(){login();return false;}">LOGIN</a>

    </div><!--ss_login-->
    <div class="ss_footer">
        <a href="#">Learn more about Sonar</a>
    </div>
</div><!--sonarstream-->

@endsection
