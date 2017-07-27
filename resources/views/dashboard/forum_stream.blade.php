<div class="ss_stream_msg ss_container" data-bind="visible:is_forum_stream">
    <div data-bind="foreach:forum_stream_items">
        <div class="hs_message">
            <div class="hs_avatar">
                <img class="hs_avatarImage" alt="Avatar" src="{{url('asset/avatar.png')}}"/>
                <a href="#" class="hs_avatarLink" title="Username"></a>
            </div>
            <div class="hs_content">
                <a class="hs_userName" title="Username" data-bind="attr:{href:'#'}"><span data-bind="text:media_name_s"></span></a>
                <a class="hs_postTime" target="_blank" data-bind="text:post_date,attr:{href:link_s}"></a>

                <div class="hs_contentText">
                    <p data-bind="text:title_s"></p>
                </div><!--hs_contentText-->
                <ul class="hs_metrics">
                  <li class="hs_metricsItem"><a href="#"><span data-bind="text:num_replies_i"></span> Replies</a></li>
                  <li class="hs_metricsItem"><a href="#"><span data-bind="text:num_views_i"></span> Views</a></li>
                </ul>
          </div><!--hs_content-->
        </div><!--hs_message-->
    </div>
</div><!--ss_stream_msg-->