@extends('main')
@section('content')
<div class="hs_stream sonarstream">
    <div class="ss_topbar">
        <ul class="hs_topBarControls">
                <li class="hs_topBarControlsBtn" title="My Account" onClick="location.href='#';">
                    <i class="icon-person"></i>
                </li>
                <li class="hs_topBarControlsBtn" data-dropdown="Search" title="Search">
                    <i class="icon-search"></i>
                </li>
                <li class="hs_topBarControlsBtn"  title="Settings" onClick="location.href='#';">
                    <i class="icon-settings"></i>
                </li>
                <li class="hs_topBarControlsBtn" data-dropdown="MenuList" title="More">
                    <i class="icon-more-vert"></i>
                </li>
        </ul>
    </div><!--ss_topbar-->
    <div class="hs_topBarDropdown hs_dropdownSearch" data-dropdown="Search">
        <button class="hs_btnCtaSml hs_btnTypeSubmit _user_search" data-bind="click:function(){search();return false;}">Search</button>
        <div class="hs_searchWrapper">
            <label class="hs_isVisuallyHidden" for="hs_searchInputExample">Search:</label>
            <input id="hs_searchInputExample" class="_user_text" type="text" placeholder="e.g. Hootsuite" data-bind="textInput:searchInput"/>
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
</div><!--sonarstream-->
@endsection