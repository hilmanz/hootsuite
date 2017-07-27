@extends('main')
@section('content')
<div class="hs_stream sonarstream">
    <div class="ss_topbar">
        <ul class="hs_topBarControls">
                <li class="hs_topBarControlsBtn" title="My Account" data-bind="click:function(){my_account();}">
                    <i class="icon-person"></i>
                </li>
                <li class="hs_topBarControlsBtn" data-dropdown="Search" title="Search">
                    <i class="icon-search"></i>
                </li>
                <li class="hs_topBarControlsBtn"  title="Settings" data-bind="click:function(){show_settings();}">
                    <i class="icon-settings"></i>
                </li>

        </ul>
    </div><!--ss_topbar-->
    <div class="hs_topBarDropdown hs_dropdownSearch">
        <button class="btn_search" data-bind="click:function(){console.log(searchInput());search();return false;}"><i class="icon-search"></i></button>
        <div class="hs_searchWrapper">
            <label class="hs_isVisuallyHidden" for="hs_searchInputExample">Search:</label>
            <input  class="_user_text" type="text" placeholder="e.g. Hootsuite" data-bind="textInput:searchInput"/>
        </div>
    </div><!--Search-->
    @include('dashboard.loading');
    @include('dashboard.welcome')
    @include('dashboard.twitter_stream')
    @include('dashboard.twitter_analytics')
    @include('dashboard.fb_stream')
    @include('dashboard.fb_analytics')
    @include('dashboard.media_stream')
    @include('dashboard.media_analytics')
    @include('dashboard.forum_stream')
    @include('dashboard.forum_analytics')
    @include('dashboard.blog_stream')
    @include('dashboard.blog_analytics')
    @include('dashboard.consolidated_analytics')
    @include('dashboard.consolidated_stream')
    @include('dashboard.account_info')
</div><!--sonarstream-->
@endsection
