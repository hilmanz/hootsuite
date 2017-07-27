
<div class="ss_welcome ss_container" data-bind="visible:is_welcome">
    <div class="ss_title ss_row">
        <h2>Welcome to Sonar on Hootsuite</h2>
    </div>
    <div class="ss_row">
        <span class="ss_label">Please define the type of the tab</span>
        <div class="col2">
            <a href="#" data-bind="css:{'ss_button':true,'checked':opt_stream()},click:function(){select_tab('stream');return false;}">Stream</a>
        </div>
        <div class="col2">
            <a data-bind="css:{'ss_button':true,'checked':opt_analytics()},click:function(){select_tab('analytics');return false;}" href="#">Analytics</a>
        </div>
    </div><!--ss_row-->
    <div class="ss_row">
        <span class="ss_label">Please choose a channel to display</span>
        <div class="col2">
            <a data-bind="css:{'ss_button':true,'checked':opt_consolidated()},click:function(){select_channel('consolidated');return false;}"  href="javascript:;">Consolidated</a>
        </div>
        <div class="col2">
            <a data-bind="css:{'ss_button':true,'checked':opt_twitter()},click:function(){select_channel('twitter');return false;}"  href="javascript:;">Twitter Only</a>
        </div>
        <div class="col2">
            <a data-bind="css:{'ss_button':true,'checked':opt_media()},click:function(){select_channel('media');return false;}"  href="javascript:;">Media Only</a>
        </div>
        <div class="col2">
            <a data-bind="css:{'ss_button':true,'checked':opt_forum()},click:function(){select_channel('forum');return false;}"  href="javascript:;">Forum Only</a>
        </div>
        <div class="col2">
            <a data-bind="css:{'ss_button':true,'checked':opt_facebook()},click:function(){select_channel('facebook');return false;}"  href="javascript:;">Facebook Only</a>
        </div>
        <div class="col2">
            <a data-bind="css:{'ss_button':true,'checked':opt_blog()},click:function(){select_channel('blog');return false;}"  href="javascript:;">Blogs Only</a>
        </div>
    </div><!--ss_row-->
    <div class="ss_row">
        <span class="ss_label">Please select wich topics to display</span>
        <div data-bind="foreach:topics">
            <div class="col2">
                <a href="javascript:;" data-bind="attr:{'data-id':campaign_id},text:campaign_name,css:{'ss_button':true,'btn_topic':true},click:function(){$parent.set_topic(campaign_id);return false;}"></a>
            </div>
        </div>
    </div><!--ss_row-->
    <div class="ss_row_btn center">
        <a href="javascript:;" class="button btn_full" data-bind="click:function(){create_tab();}">Create My Tab!</a>
    </div><!--ss_row-->
</div><!--ss_login-->

