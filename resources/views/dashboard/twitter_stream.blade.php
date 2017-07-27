
<div class="ss_stream_msg ss_container" data-bind="visible:is_stream">
    <div data-bind="foreach:stream_items">
        <div class="hs_message">
            <div class="hs_avatar">
                <img class="hs_avatarImage" alt="Avatar" data-bind="attr:{src:author_avatar_s}">
                <a href="#" class="hs_avatarLink" title="Username"></a>
            </div>
            <div class="hs_content">
                <a class="hs_userName" title="Username" data-bind="attr:{href:author_link_s}"><span data-bind="text:author_name_s"></span> <span class="userid" data-bind="text:author_id_s"></span></a>
                <a class="hs_postTime" target="_blank" data-bind="text:post_date,attr:{href:attached_url_s}"></a>

                <div class="hs_contentText">
                    <p data-bind="text:content_t"></p>
                </div><!--hs_contentText-->
                <ul class="hs_metrics">
                  <li class="hs_metricsItem"><a href="#"><span data-bind="text:interactions"></span> Interactions</a></li>
                  <li class="hs_metricsItem"><a href="#"><span data-bind="text:viral_reach"></span> Viral Reach</a></li>
                  <li class="hs_metricsItem"><a href="#"><span data-bind="text:potential_reach"></span> Potential Reach</a></li>
                </ul>
          </div><!--hs_content-->
        </div><!--hs_message-->
    </div>
</div><!--ss_stream_msg-->
