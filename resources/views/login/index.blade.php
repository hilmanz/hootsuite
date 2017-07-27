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
            <div class="ss_login">
            	<div class="big_logo">
                	<img src="{{url('asset/logo.png')}}">
                </div>
                <a href="{{url('login?pid='.$pid.'&uid='.$uid)}}" class="button">Connect Your Sonar Account</a>
                <span>Don't have  an account? <a href="{{url('register')}}">Get one here</a></span>
            </div><!--ss_login-->
            <div class="ss_footer">
            	<a href="#">Learn more about Sonar</a>
            </div>
        </div><!--sonarstream-->
@endsection
