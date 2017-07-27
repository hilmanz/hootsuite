<div class="ss_welcome ss_container" data-bind="visible:is_account_info">
    <div class="ss_row account_info">
        <div class="ss_title center">
            <h2 class="blue" data-bind="text:acc_company"></h2>
        </div>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td width="120"><strong>Language</strong></td>
                <td data-bind="text:acc_lang"></td>
            </tr>
            <tr>
                <td><strong>Location</strong></td>
                <td data-bind="text:acc_country"></td>
            </tr>
            <tr>
                <td><strong>Activation Date</strong></td>
                <td data-bind="text:acc_reg_date"></td>
            </tr>
            <tr>
                <td><strong>Valid Until</strong></td>
                <td data-bind="text:acc_exp_date"></td>
            </tr>
            <tr>
                <td><strong>Account Status</strong></td>
                <td data-bind="html:acc_status"></td>
            </tr>
            <tr>
                <td><strong>Email</strong></td>
                <td data-bind="text:acc_email"></td>
            </tr>
            <tr>
                <td><strong>Company</strong></td>
                <td data-bind="text:acc_company"></td>
            </tr>
            <tr>
                <td><strong>Last Login</strong></td>
                <td data-bind="text:acc_lastlogin_ts"></td>
            </tr>
        </table>
    </div><!--ss_row-->
    <div class="ss_row">
        <div class="ss_title">
            <h3 class="blue">Your Account Usage</h3>
        </div>
        <div class="ss_rows red">
            <span class="label">Keyword Limit</span>
            <div class="progressbox">
                <div class="progress_bar" data-bind="attr:{style:'width:'+acc_keywords_usage_percent+'%'}"></div>
                <span class="progress_value"><span data-bind="text:acc_keywords_usage"></span>/<span data-bind="text:acc_keywords_limit"></span></span>
                <div class="progress_percentage"><span data-bind="text:acc_keywords_usage_percent"></span>%</div>
            </div>
        </div>
        <div class="ss_rows green">
            <span class="label">Posts Limit</span>
            <div class="progressbox">
                <div class="progress_bar" data-bind="attr:{style:'width:'+acc_posts_usage_percent+'%'}"></div>
                <span class="progress_value"><span data-bind="text:acc_posts_usage"></span>/<span data-bind="text:acc_posts_limit"></span></span>
                 <div class="progress_percentage" ><span data-bind="text:acc_posts_usage_percent"></span>%</div>
            </div>
        </div>
        <div class="ss_rows green">
            <span class="label">Users Limit</span>
            <div class="progressbox">
                <div class="progress_bar" data-bind="attr:{style:'width:'+acc_users_usage_percent+'%'}"></div>
                <span class="progress_value"><span data-bind="text:acc_users_usage"></span>/<span data-bind="text:acc_users_limit"></span></span>
                 <div class="progress_percentage"><span data-bind="text:acc_users_usage_percent"></span>%</div>
            </div>
        </div>
    </div><!--ss_row-->
    <div class="ss_row">
        <div class="ss_title">
            <h3 class="blue">Topics &amp; Keywords</h3>
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="striped">
                <tbody data-bind="foreach:acc_topics">
                <tr>
                    <th>Topic 1</th>
                    <th>Topic 2</th>
                    <th>Topic 3</th>
                </tr>
                </tbody>
            </table>
        </div>
    </div><!--ss_row-->
</div><!--ss_login-->
