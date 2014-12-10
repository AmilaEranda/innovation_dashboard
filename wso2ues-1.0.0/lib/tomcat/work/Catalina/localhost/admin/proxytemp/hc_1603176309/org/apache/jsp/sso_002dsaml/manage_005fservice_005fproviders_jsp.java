package org.apache.jsp.sso_002dsaml;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.apache.axis2.context.ConfigurationContext;
import org.wso2.carbon.CarbonConstants;
import org.wso2.carbon.CarbonError;
import org.wso2.carbon.identity.sso.saml.ui.client.SAMLSSOConfigServiceClient;
import org.wso2.carbon.ui.CarbonUIUtil;
import org.wso2.carbon.utils.ServerConstants;
import java.util.ArrayList;
import java.util.Iterator;
import org.apache.axis2.AxisFault;
import org.wso2.carbon.identity.sso.saml.stub.types.SAMLSSOServiceProviderDTO;
import org.wso2.carbon.identity.sso.saml.stub.types.SAMLSSOServiceProviderInfoDTO;
import java.util.Collections;
import org.wso2.carbon.identity.sso.saml.ui.SAMLSSOProviderConfigBean;

public final class manage_005fservice_005fproviders_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_fmt_message_key_nobody;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_carbon_breadcrumb_topPage_resourceBundle_request_label_nobody;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_fmt_bundle_basename;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _jspx_tagPool_fmt_message_key_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_carbon_breadcrumb_topPage_resourceBundle_request_label_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_fmt_bundle_basename = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _jspx_tagPool_fmt_message_key_nobody.release();
    _jspx_tagPool_carbon_breadcrumb_topPage_resourceBundle_request_label_nobody.release();
    _jspx_tagPool_fmt_bundle_basename.release();
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("<!--\n");
      out.write("~ Copyright (c) 2005-2010, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.\n");
      out.write("~\n");
      out.write("~ WSO2 Inc. licenses this file to you under the Apache License,\n");
      out.write("~ Version 2.0 (the \"License\"); you may not use this file except\n");
      out.write("~ in compliance with the License.\n");
      out.write("~ You may obtain a copy of the License at\n");
      out.write("~\n");
      out.write("~    http://www.apache.org/licenses/LICENSE-2.0\n");
      out.write("~\n");
      out.write("~ Unless required by applicable law or agreed to in writing,\n");
      out.write("~ software distributed under the License is distributed on an\n");
      out.write("~ \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n");
      out.write("~ KIND, either express or implied.  See the License for the\n");
      out.write("~ specific language governing permissions and limitations\n");
      out.write("~ under the License.\n");
      out.write("-->\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      org.wso2.carbon.identity.sso.saml.ui.SAMLSSOProviderConfigBean samlSsoServuceProviderConfigBean = null;
      synchronized (session) {
        samlSsoServuceProviderConfigBean = (org.wso2.carbon.identity.sso.saml.ui.SAMLSSOProviderConfigBean) _jspx_page_context.getAttribute("samlSsoServuceProviderConfigBean", PageContext.SESSION_SCOPE);
        if (samlSsoServuceProviderConfigBean == null){
          samlSsoServuceProviderConfigBean = new org.wso2.carbon.identity.sso.saml.ui.SAMLSSOProviderConfigBean();
          _jspx_page_context.setAttribute("samlSsoServuceProviderConfigBean", samlSsoServuceProviderConfigBean, PageContext.SESSION_SCOPE);
        }
      }
      out.write('\n');
      org.apache.jasper.runtime.JspRuntimeLibrary.introspect(_jspx_page_context.findAttribute("samlSsoServuceProviderConfigBean"), request);
      out.write('\n');
      org.apache.jasper.runtime.JspRuntimeLibrary.include(request, response, "../dialog/display_messages.jsp", out, false);
      out.write('\n');
      out.write('\n');
      //  fmt:bundle
      org.apache.taglibs.standard.tag.rt.fmt.BundleTag _jspx_th_fmt_bundle_0 = (org.apache.taglibs.standard.tag.rt.fmt.BundleTag) _jspx_tagPool_fmt_bundle_basename.get(org.apache.taglibs.standard.tag.rt.fmt.BundleTag.class);
      _jspx_th_fmt_bundle_0.setPageContext(_jspx_page_context);
      _jspx_th_fmt_bundle_0.setParent(null);
      _jspx_th_fmt_bundle_0.setBasename("org.wso2.carbon.identity.sso.saml.ui.i18n.Resources");
      int _jspx_eval_fmt_bundle_0 = _jspx_th_fmt_bundle_0.doStartTag();
      if (_jspx_eval_fmt_bundle_0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
        if (_jspx_eval_fmt_bundle_0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
          out = _jspx_page_context.pushBody();
          _jspx_th_fmt_bundle_0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
          _jspx_th_fmt_bundle_0.doInitBody();
        }
        do {
          out.write('\n');
          //  carbon:breadcrumb
          org.wso2.carbon.ui.taglibs.Breadcrumb _jspx_th_carbon_breadcrumb_0 = (org.wso2.carbon.ui.taglibs.Breadcrumb) _jspx_tagPool_carbon_breadcrumb_topPage_resourceBundle_request_label_nobody.get(org.wso2.carbon.ui.taglibs.Breadcrumb.class);
          _jspx_th_carbon_breadcrumb_0.setPageContext(_jspx_page_context);
          _jspx_th_carbon_breadcrumb_0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
          _jspx_th_carbon_breadcrumb_0.setLabel("sso.configuration");
          _jspx_th_carbon_breadcrumb_0.setResourceBundle("org.wso2.carbon.identity.sso.saml.ui.i18n.Resources");
          _jspx_th_carbon_breadcrumb_0.setTopPage(true);
          _jspx_th_carbon_breadcrumb_0.setRequest(request);
          int _jspx_eval_carbon_breadcrumb_0 = _jspx_th_carbon_breadcrumb_0.doStartTag();
          if (_jspx_th_carbon_breadcrumb_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
            _jspx_tagPool_carbon_breadcrumb_topPage_resourceBundle_request_label_nobody.reuse(_jspx_th_carbon_breadcrumb_0);
            return;
          }
          _jspx_tagPool_carbon_breadcrumb_topPage_resourceBundle_request_label_nobody.reuse(_jspx_th_carbon_breadcrumb_0);
          out.write("\n");
          out.write("\n");
          out.write("<script type=\"text/javascript\" src=\"global-params.js\"></script>\n");
          out.write("<script type=\"text/javascript\" src=\"../carbon/admin/js/breadcrumbs.js\"></script>\n");
          out.write("<script type=\"text/javascript\" src=\"../carbon/admin/js/cookies.js\"></script>\n");
          out.write("<script type=\"text/javascript\" src=\"../carbon/admin/js/main.js\"></script>\n");
          out.write("\n");
          out.write("<script type=\"text/javascript\">\n");
          out.write("    function doValidation() {\n");
          out.write("        var fld = document.getElementsByName(\"assrtConsumerURL\")[0];\n");
          out.write("        var value = fld.value;\n");
          out.write("        if (value.length == 0) {\n");
          out.write("            CARBON.showWarningDialog(\n");
          out.write("                    \"");
          if (_jspx_meth_fmt_message_0((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\",\n");
          out.write("                    null, null);\n");
          out.write("            return false;\n");
          out.write("        }\n");
          out.write("\n");
          out.write("        value = value.replace(/^\\s+/, \"\");\n");
          out.write("        if (value.length == 0) {\n");
          out.write("            CARBON.showWarningDialog(\n");
          out.write("                    \"");
          if (_jspx_meth_fmt_message_1((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\",\n");
          out.write("                    null, null);\n");
          out.write("            return false;\n");
          out.write("        }\n");
          out.write("\n");
          out.write("        var fld = document.getElementsByName(\"issuer\")[0];\n");
          out.write("        var value = fld.value;\n");
          out.write("        if (value.length == 0) {\n");
          out.write("            CARBON.showWarningDialog(\n");
          out.write("                    \"");
          if (_jspx_meth_fmt_message_2((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\", null,\n");
          out.write("                    null);\n");
          out.write("            return false;\n");
          out.write("        }\n");
          out.write("\n");
          out.write("        if (document.getElementsByName(\"subjectType\")[1].checked) {\n");
          out.write("            var claimVal = document.getElementsByName(\"claimID\")[0].value;\n");
          out.write("            if (claimVal.length == 0) {\n");
          out.write("                CARBON.showWarningDialog(\n");
          out.write("                        \"");
          if (_jspx_meth_fmt_message_3((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\",\n");
          out.write("                        null, null);\n");
          out.write("                return false;\n");
          out.write("            }\n");
          out.write("        }\n");
          out.write("        return true;\n");
          out.write("    }\n");
          out.write("\n");
          out.write("    function edit(issuer) {\n");
          out.write("        location.href = \"manage_service_providers.jsp?region=region1&item=manage_saml_sso&SPAction=editServiceProvider&issuer=\" + issuer;\n");
          out.write("    }\n");
          out.write("\n");
          out.write("    function remove(issuer) {\n");
          out.write("        CARBON.showConfirmationDialog(\n");
          out.write("                \"");
          if (_jspx_meth_fmt_message_4((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\" + \" \" + issuer\n");
          out.write("                        + \"");
          if (_jspx_meth_fmt_message_5((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\",\n");
          out.write("                function() {\n");
          out.write("                    location.href = \"remove_service_providers.jsp?issuer=\"\n");
          out.write("                            + issuer;\n");
          out.write("                }, null);\n");
          out.write("    }\n");
          out.write("    function showHideTxtBox(radioBtn) {\n");
          out.write("        var claimIdRow = document.getElementById('claimIdRow');\n");
          out.write("        var nameIdRow = document.getElementById('nameIdRow');\n");
          out.write("        if (radioBtn.checked && radioBtn.value == \"useClaimId\") {\n");
          out.write("            claimIdRow.style.display = \"\";\n");
          out.write("            nameIdRow.style.display = \"\";\n");
          out.write("        } else {\n");
          out.write("            claimIdRow.style.display = \"none\";\n");
          out.write("            nameIdRow.style.display = \"none\";\n");
          out.write("        }\n");
          out.write("    }\n");
          out.write("    function disableCertAlias(chkbx) {\n");
          out.write("        document.addServiceProvider.alias.disabled = (chkbx.checked) ? false\n");
          out.write("                : true;\n");
          out.write("    }\n");
          out.write("    function disableLogoutUrl(chkbx) {\n");
          out.write("        document.addServiceProvider.logoutURL.disabled = (chkbx.checked) ? false\n");
          out.write("                : true;\n");
          out.write("    }\n");
          out.write("    function disableSignature(chkbx) {\n");
          out.write("        document.addServiceProvider.enableSignature.value = (chkbx.checked) ? true\n");
          out.write("                : false;\n");
          out.write("    }\n");
          out.write("    function disableAttributeProfile(chkbx) {\n");
          out.write("        document.addServiceProvider.claim.disabled = (chkbx.checked) ? false\n");
          out.write("                : true;\n");
          out.write("        document.addServiceProvider.addClaims.disabled = (chkbx.checked) ? false\n");
          out.write("                : true;\n");
          out.write("    }\n");
          out.write("    function addClaim() {\n");
          out.write("        var propertyCount = document.getElementById(\"claimPropertyCounter\");\n");
          out.write("\n");
          out.write("        var i = propertyCount.value;\n");
          out.write("        var currentCount = parseInt(i);\n");
          out.write("\n");
          out.write("        currentCount = currentCount + 1;\n");
          out.write("        propertyCount.value = currentCount;\n");
          out.write("\n");
          out.write("        document.getElementById('claimTableId').style.display = '';\n");
          out.write("        var claimTableTBody = document.getElementById('claimTableTbody');\n");
          out.write("\n");
          out.write("        var claimRow = document.createElement('tr');\n");
          out.write("        claimRow.setAttribute('id', 'claimRow' + i);\n");
          out.write("\n");
          out.write("        var claim = document.getElementById('claim').value;\n");
          out.write("        var claimPropertyTD = document.createElement('td');\n");
          out.write("        claimPropertyTD.setAttribute('style', 'padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;');\n");
          out.write("        claimPropertyTD.innerHTML = \"\" + claim + \"<input type='hidden' name='claimPropertyName\" + i + \"' id='claimPropertyName\" + i + \"'  value='\" + claim +\"'/> \";\n");
          out.write("\n");
          out.write("        var claimRemoveTD = document.createElement('td');\n");
          out.write("        claimRemoveTD.innerHTML  = \"<a href='#' class='icon-link' style='background-image: url(../admin/images/delete.gif)' onclick='removeClaim(\" + i + \");return false;'>\" + \"Delete\" + \"</a>\";\n");
          out.write("\n");
          out.write("        claimRow.appendChild(claimPropertyTD);\n");
          out.write("        claimRow.appendChild(claimRemoveTD);\n");
          out.write("\n");
          out.write("        claimTableTBody.appendChild(claimRow);\n");
          out.write("    }\n");
          out.write("\n");
          out.write("\n");
          out.write("    function removeClaim(i) {\n");
          out.write("        var propRow = document.getElementById(\"claimRow\" + i);\n");
          out.write("        if (propRow != undefined && propRow != null) {\n");
          out.write("            var parentTBody = propRow.parentNode;\n");
          out.write("            if (parentTBody != undefined && parentTBody != null) {\n");
          out.write("                parentTBody.removeChild(propRow);\n");
          out.write("                if (!isContainRaw(parentTBody)) {\n");
          out.write("                    var propertyTable = document.getElementById(\"claimTableId\");\n");
          out.write("                    propertyTable.style.display = \"none\";\n");
          out.write("\n");
          out.write("                }\n");
          out.write("            }\n");
          out.write("        }\n");
          out.write("    }\n");
          out.write("\n");
          out.write("    function isContainRaw(tbody) {\n");
          out.write("        if (tbody.childNodes == null || tbody.childNodes.length == 0) {\n");
          out.write("            return false;\n");
          out.write("        } else {\n");
          out.write("            for (var i = 0; i < tbody.childNodes.length; i++) {\n");
          out.write("                var child = tbody.childNodes[i];\n");
          out.write("                if (child != undefined && child != null) {\n");
          out.write("                    if (child.nodeName == \"tr\" || child.nodeName == \"TR\") {\n");
          out.write("                        return true;\n");
          out.write("                    }\n");
          out.write("                }\n");
          out.write("            }\n");
          out.write("        }\n");
          out.write("        return false;\n");
          out.write("    }\n");
          out.write("\n");
          out.write("    function clearAll() {\n");
          out.write("        document.addServiceProvider.action = \"update_claims.jsp?action=clear\";\n");
          out.write("        document.addServiceProvider.submit();\n");
          out.write("    }\n");
          out.write("</script>\n");
          out.write("\n");

    String cookie;
    String serverURL;
    ConfigurationContext configContext;
    SAMLSSOConfigServiceClient spConfigClient;
    ArrayList<String> aliasSet = null;
    String[] claimUris = null;
    SAMLSSOServiceProviderInfoDTO serviceProviderInfoDTO = null;
    ArrayList<SAMLSSOServiceProviderDTO> providers =
            new ArrayList<SAMLSSOServiceProviderDTO>();

    try {
        serverURL = CarbonUIUtil.getServerURL(config.getServletContext(), session);
        configContext =
                (ConfigurationContext) config.getServletContext()
                        .getAttribute(CarbonConstants.CONFIGURATION_CONTEXT);
        cookie = (String) session.getAttribute(ServerConstants.ADMIN_SERVICE_COOKIE);
        spConfigClient =
                new SAMLSSOConfigServiceClient(cookie, serverURL,
                        configContext);
        serviceProviderInfoDTO = spConfigClient.getRegisteredServiceProviders();
        if (serviceProviderInfoDTO.getServiceProviders() != null) {
            Collections.addAll(providers, serviceProviderInfoDTO.getServiceProviders());
        }
        aliasSet = spConfigClient.getCertAlias();
        claimUris = spConfigClient.getClaimURIs();
    } catch (AxisFault e) {
        CarbonError error = new CarbonError();
        error.addError(e.getMessage());
        request.getSession().setAttribute(CarbonError.ID, error);

          out.write("\n");
          out.write("<script type=\"text/javascript\">\n");
          out.write("    location.href = '../admin/error.jsp';\n");
          out.write("</script>\n");

    }

          out.write("\n");
          out.write("\n");
          out.write("<div id=\"middle\">\n");
          out.write("<h2>\n");
          out.write("    ");
          if (_jspx_meth_fmt_message_6((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("</h2>\n");
          out.write("\n");
          out.write("<div id=\"workArea\">\n");
          out.write("\n");
          out.write("<form>\n");
          out.write("    <table class=\"styledLeft\" width=\"100%\" id=\"ServiceProviders\">\n");
          out.write("        <thead>\n");
          out.write("        <tr>\n");
          out.write("            <th>");
          if (_jspx_meth_fmt_message_7((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("</th>\n");
          out.write("            <th>");
          if (_jspx_meth_fmt_message_8((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("</th>\n");
          out.write("            <th colspan=\"1\">");
          if (_jspx_meth_fmt_message_9((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("</th>\n");
          out.write("            <th colspan=\"1\">");
          if (_jspx_meth_fmt_message_10((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("</th>\n");
          out.write("            <th colspan=\"2\">");
          if (_jspx_meth_fmt_message_11((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("</th>\n");
          out.write("        </tr>\n");
          out.write("        </thead>\n");
          out.write("        <tbody>\n");
          out.write("        ");

            if (providers != null && providers.size() > 0) {
                for (SAMLSSOServiceProviderDTO sp : providers) {
        
          out.write("\n");
          out.write("        <tr>\n");
          out.write("            <td width=\"30%\">");
          out.print(sp.getIssuer());
          out.write("</td>\n");
          out.write("            <td width=\"35%\">");
          out.print(sp.getAssertionConsumerUrl());
          out.write("</td>\n");
          out.write("            <td width=\"10%\">");
          out.print(sp.getCertAlias() == null ? "" : sp.getCertAlias());
          out.write("</td>\n");
          out.write("            <td width=\"15%\">");
          out.print(sp.getAttributeConsumingServiceIndex() == null
                    ? ""
                    : sp.getAttributeConsumingServiceIndex());
          out.write("</td>\n");
          out.write("            <td width=\"10%\"><a title=\"Edit Service Providers\"\n");
          out.write("                               onclick=\"edit('");
          out.print(sp.getIssuer());
          out.write("');return false;\" href=\"#\"\n");
          out.write("                               class=\"icon-link\"\n");
          out.write("                               style=\"background-image: url(../admin/images/edit.gif)\">Edit</a>\n");
          out.write("\n");
          out.write("            </td>\n");
          out.write("            <td width=\"10%\"><a title=\"Remove Service Providers\"\n");
          out.write("                               onclick=\"remove('");
          out.print(sp.getIssuer());
          out.write("');return false;\" href=\"#\"\n");
          out.write("                               class=\"icon-link\"\n");
          out.write("                               style=\"background-image: url(../admin/images/delete.gif)\">Delete\n");
          out.write("            </a></td>\n");
          out.write("        </tr>\n");
          out.write("        ");

            }
        } else {
        
          out.write("\n");
          out.write("        <tr>\n");
          out.write("            <td colspan=\"4\"><i>");
          if (_jspx_meth_fmt_message_12((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("</i></td>\n");
          out.write("        </tr>\n");
          out.write("        ");

            }
        
          out.write("\n");
          out.write("        </tbody>\n");
          out.write("    </table>\n");
          out.write("    <script type=\"text/javascript\">\n");
          out.write("\n");
          out.write("        alternateTableRows('ServiceProviders', 'tableEvenRow',\n");
          out.write("                'tableOddRow');\n");
          out.write("    </script>\n");
          out.write("</form>\n");
          out.write("\n");
          out.write("<br />\n");

    SAMLSSOServiceProviderDTO provider = null;
    String spAction = request.getParameter("SPAction");
    String claimTableStyle = "display:none";
    String issuer = request.getParameter("issuer");
    boolean isEditSP = false;
    if (spAction != null && "editServiceProvider".equals(spAction)) {
        if (providers.size() > 0) {
            for (SAMLSSOServiceProviderDTO sp : providers) {
                if (issuer.equals(sp.getIssuer())) {
                    isEditSP = true;
                    provider = sp;
                    claimTableStyle = provider.getRequestedClaims().length > 0 ? "" :"display:none";
                }
            }
        }
    }

          out.write("\n");
          out.write("\n");
          out.write("<form method=\"POST\" action=\"add_service_provider.jsp?SPAction=");
          out.print(spAction);
          out.write("\"\n");
          out.write("      id=\"addServiceProvider\" name=\"addServiceProvider\" target=\"_self\"\n");
          out.write("      onsubmit=\"return doValidation();\">\n");
          out.write("<table class=\"styledLeft\" width=\"100%\">\n");
          out.write("<thead>\n");
          out.write("<tr>\n");
          out.write("    ");

        if (isEditSP) {
    
          out.write("\n");
          out.write("    <th>");
          if (_jspx_meth_fmt_message_13((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.print(provider.getIssuer());
          out.write(")</th>\n");
          out.write("    ");

    } else {
    
          out.write("\n");
          out.write("    <th>");
          if (_jspx_meth_fmt_message_14((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("</th>\n");
          out.write("    ");

        }
    
          out.write("\n");
          out.write("</tr>\n");
          out.write("</thead>\n");
          out.write("<tbody>\n");
          out.write("<tr>\n");
          out.write("<td class=\"formRow\">\n");
          out.write("<table class=\"normal\" cellspacing=\"0\" style=\"width: 100%;\">\n");
          out.write("<tr>\n");
          out.write("    <td style=\"width: 300px;\">\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_15((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("        <font color=\"red\">*</font>\n");
          out.write("    </td>\n");
          out.write("    <td><input type=\"text\" id=\"issuer\" name=\"issuer\"\n");
          out.write("               class=\"text-box-big\"\n");
          out.write("               value=\"");
          out.print(isEditSP? provider.getIssuer():"");
          out.write('"');
          out.write(' ');
          out.print(isEditSP ? "disabled=\"disabled\"" : "");
          out.write("/>\n");
          out.write("        <input type=\"hidden\" id=\"hiddenIssuer\" name=\"hiddenIssuer\" value=\"");
          out.print(isEditSP? provider.getIssuer():"");
          out.write("\"/>\n");
          out.write("    </td>\n");
          out.write("</tr>\n");
          out.write("<tr>\n");
          out.write("    <td>\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_16((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("        <font color=\"red\">*</font>\n");
          out.write("    </td>\n");
          out.write("    <td>\n");
          out.write("        <input type=\"text\" id=\"assrtConsumerURL\"\n");
          out.write("               name=\"assrtConsumerURL\" class=\"text-box-big\"\n");
          out.write("               value=\"");
          out.print(isEditSP?provider.getAssertionConsumerUrl():"");
          out.write("\" />\n");
          out.write("    </td>\n");
          out.write("</tr>\n");
          out.write("\n");
          out.write("<!-- UseFullQualifiedUsername -->\n");
          out.write("\n");
          out.write("<tr>\n");
          out.write("    <td colspan=\"2\">\n");
          out.write("        <input type=\"checkbox\" name=\"useFullQualifiedUsername\" value=\"true\"\n");
          out.write("                ");
          out.print((isEditSP && provider.getUseFullyQualifiedUsername()?"checked=\"checked\"":""));
          out.write(" />\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_17((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("    </td>\n");
          out.write("</tr>\n");
          out.write("\n");
          out.write("\n");
          out.write("<!-- EnableSignatureTrigger, FIXME it seems this config is not considered -->\n");
          out.write("<tr>\n");
          out.write("    <td colspan=\"2\">\n");
          out.write("        <input type=\"checkbox\" name=\"enableSignature\" value=\"true\"\n");
          out.write("               onclick=\"disableSignature(this);\"\n");
          out.write("                ");
          out.print((isEditSP && provider.getDoSignAssertions() ? "checked=\"checked\"":""));
          out.write(" />\n");
          out.write("            ");
          out.write("\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_18((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("    </td>\n");
          out.write("</tr>\n");
          out.write("\n");
          out.write("<!-- enableSigValidation -->\n");
 if(isEditSP && provider.isCertAliasSpecified()) {

          out.write("\n");
          out.write("<tr>\n");
          out.write("    <td colspan=\"2\">\n");
          out.write("        <input type=\"checkbox\"\n");
          out.write("               name=\"enableSigValidation\" value=\"true\" checked=\"checked\"\n");
          out.write("               onclick=\"disableCertAlias(this);\" />\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_19((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("    </td>\n");
          out.write("</tr>\n");
          out.write("<tr>\n");
          out.write("    <td style=\"padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;\">\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_20((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("    </td>\n");
          out.write("    <td><select id=\"alias\" name=\"alias\">\n");
          out.write("        ");

            if (aliasSet != null) {
                for (String alias : aliasSet) {
                    if (alias != null) {
                        if (alias.equals(provider.getCertAlias())) {
        
          out.write("\n");
          out.write("        <option selected=\"selected\" value=\"");
          out.print(alias);
          out.write('"');
          out.write('>');
          out.print(alias);
          out.write("\n");
          out.write("        </option>\n");
          out.write("        ");

        } else {
        
          out.write("\n");
          out.write("        <option value=\"");
          out.print(alias);
          out.write('"');
          out.write('>');
          out.print(alias);
          out.write("\n");
          out.write("        </option>\n");
          out.write("        ");

                        }
                    }
                }
            }
        
          out.write("\n");
          out.write("    </select></td>\n");
          out.write("</tr>\n");
 } else {
          out.write("\n");
          out.write("<tr>\n");
          out.write("    <td colspan=\"2\">\n");
          out.write("        <input type=\"checkbox\"\n");
          out.write("               name=\"enableSigValidation\" value=\"true\"\n");
          out.write("               onclick=\"disableCertAlias(this);\" />\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_21((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("    </td>\n");
          out.write("</tr>\n");
          out.write("<tr>\n");
          out.write("    <td style=\"padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;\">\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_22((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("    </td>\n");
          out.write("    <td><select id=\"alias\" name=\"alias\" disabled=\"disabled\">\n");
          out.write("        ");

            if (aliasSet != null) {
                for (String alias : aliasSet) {
                    if (alias != null) {
                        if (alias.equals(samlSsoServuceProviderConfigBean.getCertificateAlias())) {
        
          out.write("\n");
          out.write("        <option selected=\"selected\" value=\"");
          out.print(alias);
          out.write('"');
          out.write('>');
          out.print(alias);
          out.write("\n");
          out.write("        </option>\n");
          out.write("        ");

        } else {
        
          out.write("\n");
          out.write("        <option value=\"");
          out.print(alias);
          out.write('"');
          out.write('>');
          out.print(alias);
          out.write("\n");
          out.write("        </option>\n");
          out.write("        ");

                        }
                    }
                }
            }
        
          out.write("\n");
          out.write("    </select></td>\n");
          out.write("</tr>\n");
}
          out.write("\n");
          out.write("\n");
          out.write("<!-- EnableSingleLogout -->\n");

    if(isEditSP && provider.getDoSingleLogout()){

          out.write("\n");
          out.write("<tr>\n");
          out.write("    <td colspan=\"2\"><input type=\"checkbox\"\n");
          out.write("                           name=\"enableSingleLogout\" value=\"true\"\n");
          out.write("                           onclick=\"disableLogoutUrl(this);\" checked=\"checked\" /> ");
          if (_jspx_meth_fmt_message_23((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("</td>\n");
          out.write("</tr>\n");
          out.write("<tr>\n");
          out.write("    <td\n");
          out.write("            style=\"padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;\">\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_24((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("    </td>\n");
          out.write("    <td><input type=\"text\" id=\"logoutURL\" name=\"logoutURL\"\n");
          out.write("               value=\"");
          out.print(provider.getLogoutURL());
          out.write("\"\n");
          out.write("               class=\"text-box-big\"></td>\n");
          out.write("</tr>\n");
 } else {
          out.write("\n");
          out.write("<tr>\n");
          out.write("    <td colspan=\"2\"><input type=\"checkbox\"\n");
          out.write("                           name=\"enableSingleLogout\" value=\"true\"\n");
          out.write("                           onclick=\"disableLogoutUrl(this);\" /> ");
          if (_jspx_meth_fmt_message_25((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("</td>\n");
          out.write("</tr>\n");
          out.write("<tr>\n");
          out.write("    <td\n");
          out.write("            style=\"padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;\">\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_26((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("    </td>\n");
          out.write("    <td><input type=\"text\" id=\"logoutURL\" name=\"logoutURL\"\n");
          out.write("               value=\"");
          out.print(samlSsoServuceProviderConfigBean.getSingleLogoutUrl());
          out.write("\"\n");
          out.write("               class=\"text-box-big\" disabled=\"disabled\"></td>\n");
          out.write("</tr>\n");
 } 
          out.write("\n");
          out.write("\n");
          out.write("<!-- EnableAttributeProfile -->\n");
 if(isEditSP && provider.getRequestedClaims().length > 0 && provider.getRequestedClaims()[0] != null){

          out.write("\n");
          out.write("<tr>\n");
          out.write("    <td colspan=\"2\"><input type=\"checkbox\"\n");
          out.write("                           name=\"enableAttributeProfile\" id=\"enableAttributeProfile\" value=\"true\" checked=\"checked\"\n");
          out.write("                           onclick=\"disableAttributeProfile(this);\" /> ");
          if (_jspx_meth_fmt_message_27((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("</td>\n");
          out.write("</tr>\n");
          out.write("<tr>\n");
          out.write("    <td\n");
          out.write("            style=\"padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;\">\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_28((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("    </td>\n");
          out.write("    <td>\n");
          out.write("        <select id=\"claim\" name=\"claim\">\n");
          out.write("            ");

                if (claimUris != null) {
                    for (String claimUri : claimUris) {
                        if (claimUri != null) {
            
          out.write("\n");
          out.write("            <option value=\"");
          out.print(claimUri);
          out.write('"');
          out.write('>');
          out.print(claimUri);
          out.write("</option>\n");
          out.write("            ");

                        }
                    }
                }
            
          out.write("\n");
          out.write("        </select> <input id=\"addClaims\" name=\"addClaims\" type=\"button\"\n");
          out.write("                         value=\"");
          if (_jspx_meth_fmt_message_29((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\"\n");
          out.write("                         onclick=\"addClaim()\" />\n");
          out.write("    </td>\n");
          out.write("</tr>\n");
 } else {
          out.write("\n");
          out.write("<tr>\n");
          out.write("    <td colspan=\"2\">\n");
          out.write("        <input type=\"checkbox\"\n");
          out.write("               name=\"enableAttributeProfile\" id=\"enableAttributeProfile\" value=\"true\"\n");
          out.write("               onclick=\"disableAttributeProfile(this);\" />\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_30((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("    </td>\n");
          out.write("</tr>\n");
          out.write("<tr>\n");
          out.write("    <td\n");
          out.write("            style=\"padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;\">\n");
          out.write("        ");
          if (_jspx_meth_fmt_message_31((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\n");
          out.write("    </td>\n");
          out.write("    <td>\n");
          out.write("        <select id=\"claim\" name=\"claim\" disabled=\"disabled\">\n");
          out.write("            ");

                if (claimUris != null) {
                    for (String claimUri : claimUris) {
                        if (claimUri != null) {
            
          out.write("\n");
          out.write("            <option value=\"");
          out.print(claimUri);
          out.write('"');
          out.write('>');
          out.print(claimUri);
          out.write("</option>\n");
          out.write("            ");

                        }
                    }
                }
            
          out.write("\n");
          out.write("        </select> <input id=\"addClaims\" name=\"addClaims\" type=\"button\"\n");
          out.write("                         disabled=\"disabled\" value=\"");
          if (_jspx_meth_fmt_message_32((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\"\n");
          out.write("                         onclick=\"addClaim()\" />\n");
          out.write("    </td>\n");
          out.write("</tr>\n");
} 
          out.write("\n");
          out.write("<tr>\n");
          out.write("    <td>\n");
          out.write("        <table id=\"claimTableId\" style=\"");
          out.print(claimTableStyle);
          out.write("\" class=\"styledInner\">\n");
          out.write("            <tbody id=\"claimTableTbody\">\n");
          out.write("            ");

                int i = 0;
                if (isEditSP && provider.getRequestedClaims().length > 0) {
            
          out.write("\n");
          out.write("            ");

                for (String claim : provider.getRequestedClaims()) {
                    if(claim != null && !"null".equals(claim)){
            
          out.write("\n");
          out.write("            <tr id=\"claimRow");
          out.print(i);
          out.write("\">\n");
          out.write("                <td style=\"padding-left: 40px ! important; color: rgb(119, 119, 119); font-style: italic;\">\n");
          out.write("                    <input type=\"hidden\" name=\"claimPropertyName");
          out.print(i);
          out.write("\" id=\"claimPropertyName");
          out.print(i);
          out.write("\" value=\"");
          out.print(claim);
          out.write("\"/>");
          out.print(claim);
          out.write("</td>\n");
          out.write("                <td>\n");
          out.write("                    <a onclick=\"removeClaim('");
          out.print(i);
          out.write("');return false;\"\n");
          out.write("                       href=\"#\" class=\"icon-link\" style=\"background-image: url(../admin/images/delete.gif)\">Delete\n");
          out.write("                    </a>\n");
          out.write("                </td>\n");
          out.write("            </tr>\n");
          out.write("            ");

                        i++;
                    }
                }
            
          out.write("\n");
          out.write("            ");

                }
            
          out.write("\n");
          out.write("            <input type=\"hidden\" name=\"claimPropertyCounter\" id=\"claimPropertyCounter\" value=\"");
          out.print(i);
          out.write("\"/>\n");
          out.write("            </tbody>\n");
          out.write("        </table>\n");
          out.write("    </td>\n");
          out.write("</tr>\n");
          out.write("</table>\n");
          out.write("</td>\n");
          out.write("</tr>\n");
          out.write("<tr>\n");
          out.write("    <td class=\"buttonRow\">\n");
          out.write("        ");

            if (isEditSP) {
        
          out.write("\n");
          out.write("        <input class=\"button\" type=\"submit\" value=\"");
          if (_jspx_meth_fmt_message_33((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\"/>\n");
          out.write("        ");

        } else {
        
          out.write("\n");
          out.write("        <input class=\"button\" type=\"submit\" value=\"");
          if (_jspx_meth_fmt_message_34((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\"/>\n");
          out.write("        ");

            }
        
          out.write("\n");
          out.write("        <input class=\"button\" type=\"button\" onclick=\"clearAll()\"\n");
          out.write("               value=\"");
          if (_jspx_meth_fmt_message_35((javax.servlet.jsp.tagext.JspTag) _jspx_th_fmt_bundle_0, _jspx_page_context))
            return;
          out.write("\"/>\n");
          out.write("    </td>\n");
          out.write("</tr>\n");
          out.write("</tbody>\n");
          out.write("</table>\n");
          out.write("</form>\n");
          out.write("</div>\n");
          out.write("</div>\n");
          int evalDoAfterBody = _jspx_th_fmt_bundle_0.doAfterBody();
          if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
            break;
        } while (true);
        if (_jspx_eval_fmt_bundle_0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE)
          out = _jspx_page_context.popBody();
      }
      if (_jspx_th_fmt_bundle_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        _jspx_tagPool_fmt_bundle_basename.reuse(_jspx_th_fmt_bundle_0);
        return;
      }
      _jspx_tagPool_fmt_bundle_basename.reuse(_jspx_th_fmt_bundle_0);
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }

  private boolean _jspx_meth_fmt_message_0(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_0 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_0.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_0.setKey("sp.enter.valid.endpoint.address");
    int _jspx_eval_fmt_message_0 = _jspx_th_fmt_message_0.doStartTag();
    if (_jspx_th_fmt_message_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_0);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_0);
    return false;
  }

  private boolean _jspx_meth_fmt_message_1(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_1 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_1.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_1.setKey("sp.enter.valid.endpoint.address");
    int _jspx_eval_fmt_message_1 = _jspx_th_fmt_message_1.doStartTag();
    if (_jspx_th_fmt_message_1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_1);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_1);
    return false;
  }

  private boolean _jspx_meth_fmt_message_2(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_2 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_2.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_2.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_2.setKey("sp.enter.valid.issuer");
    int _jspx_eval_fmt_message_2 = _jspx_th_fmt_message_2.doStartTag();
    if (_jspx_th_fmt_message_2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_2);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_2);
    return false;
  }

  private boolean _jspx_meth_fmt_message_3(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_3 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_3.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_3.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_3.setKey("sp.enter.valid.claimID");
    int _jspx_eval_fmt_message_3 = _jspx_th_fmt_message_3.doStartTag();
    if (_jspx_th_fmt_message_3.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_3);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_3);
    return false;
  }

  private boolean _jspx_meth_fmt_message_4(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_4 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_4.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_4.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_4.setKey("remove.message1");
    int _jspx_eval_fmt_message_4 = _jspx_th_fmt_message_4.doStartTag();
    if (_jspx_th_fmt_message_4.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_4);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_4);
    return false;
  }

  private boolean _jspx_meth_fmt_message_5(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_5 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_5.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_5.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_5.setKey("remove.message2");
    int _jspx_eval_fmt_message_5 = _jspx_th_fmt_message_5.doStartTag();
    if (_jspx_th_fmt_message_5.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_5);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_5);
    return false;
  }

  private boolean _jspx_meth_fmt_message_6(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_6 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_6.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_6.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_6.setKey("saml.sso");
    int _jspx_eval_fmt_message_6 = _jspx_th_fmt_message_6.doStartTag();
    if (_jspx_th_fmt_message_6.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_6);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_6);
    return false;
  }

  private boolean _jspx_meth_fmt_message_7(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_7 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_7.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_7.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_7.setKey("sp.issuer");
    int _jspx_eval_fmt_message_7 = _jspx_th_fmt_message_7.doStartTag();
    if (_jspx_th_fmt_message_7.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_7);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_7);
    return false;
  }

  private boolean _jspx_meth_fmt_message_8(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_8 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_8.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_8.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_8.setKey("sp.assertionConsumerURL");
    int _jspx_eval_fmt_message_8 = _jspx_th_fmt_message_8.doStartTag();
    if (_jspx_th_fmt_message_8.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_8);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_8);
    return false;
  }

  private boolean _jspx_meth_fmt_message_9(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_9 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_9.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_9.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_9.setKey("sp.certAlias");
    int _jspx_eval_fmt_message_9 = _jspx_th_fmt_message_9.doStartTag();
    if (_jspx_th_fmt_message_9.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_9);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_9);
    return false;
  }

  private boolean _jspx_meth_fmt_message_10(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_10 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_10.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_10.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_10.setKey("sp.consumerIndex");
    int _jspx_eval_fmt_message_10 = _jspx_th_fmt_message_10.doStartTag();
    if (_jspx_th_fmt_message_10.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_10);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_10);
    return false;
  }

  private boolean _jspx_meth_fmt_message_11(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_11 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_11.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_11.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_11.setKey("sp.action");
    int _jspx_eval_fmt_message_11 = _jspx_th_fmt_message_11.doStartTag();
    if (_jspx_th_fmt_message_11.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_11);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_11);
    return false;
  }

  private boolean _jspx_meth_fmt_message_12(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_12 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_12.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_12.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_12.setKey("saml.sso.service.providers.not.found");
    int _jspx_eval_fmt_message_12 = _jspx_th_fmt_message_12.doStartTag();
    if (_jspx_th_fmt_message_12.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_12);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_12);
    return false;
  }

  private boolean _jspx_meth_fmt_message_13(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_13 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_13.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_13.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_13.setKey("saml.sso.edit.service.provider");
    int _jspx_eval_fmt_message_13 = _jspx_th_fmt_message_13.doStartTag();
    if (_jspx_th_fmt_message_13.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_13);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_13);
    return false;
  }

  private boolean _jspx_meth_fmt_message_14(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_14 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_14.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_14.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_14.setKey("saml.sso.register.service.provider");
    int _jspx_eval_fmt_message_14 = _jspx_th_fmt_message_14.doStartTag();
    if (_jspx_th_fmt_message_14.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_14);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_14);
    return false;
  }

  private boolean _jspx_meth_fmt_message_15(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_15 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_15.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_15.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_15.setKey("sp.issuer");
    int _jspx_eval_fmt_message_15 = _jspx_th_fmt_message_15.doStartTag();
    if (_jspx_th_fmt_message_15.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_15);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_15);
    return false;
  }

  private boolean _jspx_meth_fmt_message_16(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_16 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_16.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_16.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_16.setKey("sp.assertionConsumerURL");
    int _jspx_eval_fmt_message_16 = _jspx_th_fmt_message_16.doStartTag();
    if (_jspx_th_fmt_message_16.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_16);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_16);
    return false;
  }

  private boolean _jspx_meth_fmt_message_17(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_17 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_17.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_17.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_17.setKey("use.fullqualified.username");
    int _jspx_eval_fmt_message_17 = _jspx_th_fmt_message_17.doStartTag();
    if (_jspx_th_fmt_message_17.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_17);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_17);
    return false;
  }

  private boolean _jspx_meth_fmt_message_18(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_18 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_18.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_18.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_18.setKey("do.signature");
    int _jspx_eval_fmt_message_18 = _jspx_th_fmt_message_18.doStartTag();
    if (_jspx_th_fmt_message_18.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_18);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_18);
    return false;
  }

  private boolean _jspx_meth_fmt_message_19(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_19 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_19.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_19.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_19.setKey("validate.signature");
    int _jspx_eval_fmt_message_19 = _jspx_th_fmt_message_19.doStartTag();
    if (_jspx_th_fmt_message_19.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_19);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_19);
    return false;
  }

  private boolean _jspx_meth_fmt_message_20(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_20 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_20.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_20.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_20.setKey("sp.certAlias");
    int _jspx_eval_fmt_message_20 = _jspx_th_fmt_message_20.doStartTag();
    if (_jspx_th_fmt_message_20.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_20);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_20);
    return false;
  }

  private boolean _jspx_meth_fmt_message_21(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_21 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_21.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_21.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_21.setKey("validate.signature");
    int _jspx_eval_fmt_message_21 = _jspx_th_fmt_message_21.doStartTag();
    if (_jspx_th_fmt_message_21.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_21);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_21);
    return false;
  }

  private boolean _jspx_meth_fmt_message_22(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_22 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_22.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_22.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_22.setKey("sp.certAlias");
    int _jspx_eval_fmt_message_22 = _jspx_th_fmt_message_22.doStartTag();
    if (_jspx_th_fmt_message_22.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_22);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_22);
    return false;
  }

  private boolean _jspx_meth_fmt_message_23(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_23 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_23.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_23.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_23.setKey("enable.single.logout");
    int _jspx_eval_fmt_message_23 = _jspx_th_fmt_message_23.doStartTag();
    if (_jspx_th_fmt_message_23.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_23);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_23);
    return false;
  }

  private boolean _jspx_meth_fmt_message_24(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_24 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_24.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_24.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_24.setKey("logout.url");
    int _jspx_eval_fmt_message_24 = _jspx_th_fmt_message_24.doStartTag();
    if (_jspx_th_fmt_message_24.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_24);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_24);
    return false;
  }

  private boolean _jspx_meth_fmt_message_25(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_25 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_25.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_25.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_25.setKey("enable.single.logout");
    int _jspx_eval_fmt_message_25 = _jspx_th_fmt_message_25.doStartTag();
    if (_jspx_th_fmt_message_25.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_25);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_25);
    return false;
  }

  private boolean _jspx_meth_fmt_message_26(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_26 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_26.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_26.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_26.setKey("logout.url");
    int _jspx_eval_fmt_message_26 = _jspx_th_fmt_message_26.doStartTag();
    if (_jspx_th_fmt_message_26.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_26);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_26);
    return false;
  }

  private boolean _jspx_meth_fmt_message_27(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_27 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_27.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_27.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_27.setKey("enable.attribute.profile");
    int _jspx_eval_fmt_message_27 = _jspx_th_fmt_message_27.doStartTag();
    if (_jspx_th_fmt_message_27.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_27);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_27);
    return false;
  }

  private boolean _jspx_meth_fmt_message_28(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_28 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_28.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_28.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_28.setKey("sp.claim");
    int _jspx_eval_fmt_message_28 = _jspx_th_fmt_message_28.doStartTag();
    if (_jspx_th_fmt_message_28.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_28);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_28);
    return false;
  }

  private boolean _jspx_meth_fmt_message_29(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_29 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_29.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_29.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_29.setKey("saml.sso.add.claim");
    int _jspx_eval_fmt_message_29 = _jspx_th_fmt_message_29.doStartTag();
    if (_jspx_th_fmt_message_29.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_29);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_29);
    return false;
  }

  private boolean _jspx_meth_fmt_message_30(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_30 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_30.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_30.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_30.setKey("enable.attribute.profile");
    int _jspx_eval_fmt_message_30 = _jspx_th_fmt_message_30.doStartTag();
    if (_jspx_th_fmt_message_30.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_30);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_30);
    return false;
  }

  private boolean _jspx_meth_fmt_message_31(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_31 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_31.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_31.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_31.setKey("sp.claim");
    int _jspx_eval_fmt_message_31 = _jspx_th_fmt_message_31.doStartTag();
    if (_jspx_th_fmt_message_31.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_31);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_31);
    return false;
  }

  private boolean _jspx_meth_fmt_message_32(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_32 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_32.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_32.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_32.setKey("saml.sso.add.claim");
    int _jspx_eval_fmt_message_32 = _jspx_th_fmt_message_32.doStartTag();
    if (_jspx_th_fmt_message_32.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_32);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_32);
    return false;
  }

  private boolean _jspx_meth_fmt_message_33(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_33 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_33.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_33.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_33.setKey("saml.sso.edit");
    int _jspx_eval_fmt_message_33 = _jspx_th_fmt_message_33.doStartTag();
    if (_jspx_th_fmt_message_33.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_33);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_33);
    return false;
  }

  private boolean _jspx_meth_fmt_message_34(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_34 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_34.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_34.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_34.setKey("saml.sso.register");
    int _jspx_eval_fmt_message_34 = _jspx_th_fmt_message_34.doStartTag();
    if (_jspx_th_fmt_message_34.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_34);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_34);
    return false;
  }

  private boolean _jspx_meth_fmt_message_35(javax.servlet.jsp.tagext.JspTag _jspx_th_fmt_bundle_0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_35 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_message_35.setPageContext(_jspx_page_context);
    _jspx_th_fmt_message_35.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
    _jspx_th_fmt_message_35.setKey("saml.sso.clear");
    int _jspx_eval_fmt_message_35 = _jspx_th_fmt_message_35.doStartTag();
    if (_jspx_th_fmt_message_35.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_35);
      return true;
    }
    _jspx_tagPool_fmt_message_key_nobody.reuse(_jspx_th_fmt_message_35);
    return false;
  }
}
