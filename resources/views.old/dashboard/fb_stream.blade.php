<div class="ss_stream_msg ss_container" data-bind="visible:is_fb_stream">
    <div data-bind="foreach:fb_stream_items">
        <div class="hs_message">
            <div class="hs_avatar">
                <img class="hs_avatarImage" alt="Avatar" data-bind="attr:{src:'https://graph.facebook.com/v2.5/'+author_id_s+'/picture'}">
                <a href="#" class="hs_avatarLink" title="Username"></a>
            </div>
            <div class="hs_content">
                <a class="hs_userName" title="Username" data-bind="attr:{href:'http://facebook.com/'+author_id_s}"><span data-bind="text:author_name_s"></span></a>
                <a class="hs_postTime" target="_blank" data-bind="text:post_date,attr:{href:link_s}"></a>

                <div class="hs_contentText">
                    <p data-bind="text:message_t"></p>
                </div><!--hs_contentText-->
                <ul class="hs_metrics">
                  <li class="hs_metricsItem"><a href="#"><span data-bind="text:num_likes_i"></span> Likes</a></li>
                  <li class="hs_metricsItem"><a href="#"><span data-bind="text:num_comments_i"></span> Comments</a></li>
                  <li class="hs_metricsItem"><a href="#"><span data-bind="text:num_shares_i"></span> Shares</a></li>
                </ul>
          </div><!--hs_content-->
        </div><!--hs_message-->
    </div>
</div><!--ss_stream_msg-->