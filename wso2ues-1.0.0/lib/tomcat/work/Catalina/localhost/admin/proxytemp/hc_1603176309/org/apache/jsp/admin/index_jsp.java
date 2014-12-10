package org.apache.jsp.admin;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.axis2.transport.http.HTTPConstants;
import org.wso2.carbon.ui.CarbonUIUtil;
import org.wso2.carbon.utils.ServerConstants;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_fmt_param_value_nobody;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_fmt_message_key;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_fmt_bundle_basename;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _jspx_tagPool_fmt_param_value_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_fmt_message_key = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_fmt_bundle_basename = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _jspx_tagPool_fmt_param_value_nobody.release();
    _jspx_tagPool_fmt_message_key.release();
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
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      org.apache.jasper.runtime.JspRuntimeLibrary.include(request, response, "../dialog/display_messages.jsp", out, false);
      out.write('\n');
      out.write('\n');
      //  fmt:bundle
      org.apache.taglibs.standard.tag.rt.fmt.BundleTag _jspx_th_fmt_bundle_0 = (org.apache.taglibs.standard.tag.rt.fmt.BundleTag) _jspx_tagPool_fmt_bundle_basename.get(org.apache.taglibs.standard.tag.rt.fmt.BundleTag.class);
      _jspx_th_fmt_bundle_0.setPageContext(_jspx_page_context);
      _jspx_th_fmt_bundle_0.setParent(null);
      _jspx_th_fmt_bundle_0.setBasename("org.wso2.carbon.i18n.Resources");
      int _jspx_eval_fmt_bundle_0 = _jspx_th_fmt_bundle_0.doStartTag();
      if (_jspx_eval_fmt_bundle_0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
        if (_jspx_eval_fmt_bundle_0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
          out = _jspx_page_context.pushBody();
          _jspx_th_fmt_bundle_0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
          _jspx_th_fmt_bundle_0.doInitBody();
        }
        do {
          out.write('\n');
          out.write('\n');

                Object param = session.getAttribute("authenticated");
				String passwordExpires = (String) session
						.getAttribute(ServerConstants.PASSWORD_EXPIRATION);
				boolean loggedIn = false;
				if (param != null) {
					loggedIn = (Boolean) param;
				}
				boolean serverAdminComponentFound = CarbonUIUtil
						.isContextRegistered(config, "/server-admin/");
				
				if (request.getParameter("skipLoginPage")!=null){
					response.sendRedirect("../admin/login_action.jsp");
					return;
				}

          out.write("\n");
          out.write("    <div id=\"middle\">\n");
          out.write("        ");

            String serverName = CarbonUIUtil
        						.getServerConfigurationProperty("Name");
        
          out.write("\n");
          out.write("        <h2>\n");
          out.write("            ");
          //  fmt:message
          org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_0 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
          _jspx_th_fmt_message_0.setPageContext(_jspx_page_context);
          _jspx_th_fmt_message_0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
          _jspx_th_fmt_message_0.setKey("carbon.server.home");
          int _jspx_eval_fmt_message_0 = _jspx_th_fmt_message_0.doStartTag();
          if (_jspx_eval_fmt_message_0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
            if (_jspx_eval_fmt_message_0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
              out = _jspx_page_context.pushBody();
              _jspx_th_fmt_message_0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
              _jspx_th_fmt_message_0.doInitBody();
            }
            do {
              out.write("\n");
              out.write("                ");
              //  fmt:param
              org.apache.taglibs.standard.tag.rt.fmt.ParamTag _jspx_th_fmt_param_0 = (org.apache.taglibs.standard.tag.rt.fmt.ParamTag) _jspx_tagPool_fmt_param_value_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.ParamTag.class);
              _jspx_th_fmt_param_0.setPageContext(_jspx_page_context);
              _jspx_th_fmt_param_0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_message_0);
              _jspx_th_fmt_param_0.setValue( serverName);
              int _jspx_eval_fmt_param_0 = _jspx_th_fmt_param_0.doStartTag();
              if (_jspx_th_fmt_param_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
                _jspx_tagPool_fmt_param_value_nobody.reuse(_jspx_th_fmt_param_0);
                return;
              }
              _jspx_tagPool_fmt_param_value_nobody.reuse(_jspx_th_fmt_param_0);
              out.write("\n");
              out.write("            ");
              int evalDoAfterBody = _jspx_th_fmt_message_0.doAfterBody();
              if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
                break;
            } while (true);
            if (_jspx_eval_fmt_message_0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE)
              out = _jspx_page_context.popBody();
          }
          if (_jspx_th_fmt_message_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
            _jspx_tagPool_fmt_message_key.reuse(_jspx_th_fmt_message_0);
            return;
          }
          _jspx_tagPool_fmt_message_key.reuse(_jspx_th_fmt_message_0);
          out.write("\n");
          out.write("        </h2>\n");
          out.write("\n");
          out.write("        <p>\n");
          out.write("            ");
          //  fmt:message
          org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_message_1 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _jspx_tagPool_fmt_message_key.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
          _jspx_th_fmt_message_1.setPageContext(_jspx_page_context);
          _jspx_th_fmt_message_1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_bundle_0);
          _jspx_th_fmt_message_1.setKey("carbon.console.welcome");
          int _jspx_eval_fmt_message_1 = _jspx_th_fmt_message_1.doStartTag();
          if (_jspx_eval_fmt_message_1 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
            if (_jspx_eval_fmt_message_1 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
              out = _jspx_page_context.pushBody();
              _jspx_th_fmt_message_1.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
              _jspx_th_fmt_message_1.doInitBody();
            }
            do {
              out.write("\n");
              out.write("                ");
              //  fmt:param
              org.apache.taglibs.standard.tag.rt.fmt.ParamTag _jspx_th_fmt_param_1 = (org.apache.taglibs.standard.tag.rt.fmt.ParamTag) _jspx_tagPool_fmt_param_value_nobody.get(org.apache.taglibs.standard.tag.rt.fmt.ParamTag.class);
              _jspx_th_fmt_param_1.setPageContext(_jspx_page_context);
              _jspx_th_fmt_param_1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_fmt_message_1);
              _jspx_th_fmt_param_1.setValue( serverName);
              int _jspx_eval_fmt_param_1 = _jspx_th_fmt_param_1.doStartTag();
              if (_jspx_th_fmt_param_1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
                _jspx_tagPool_fmt_param_value_nobody.reuse(_jspx_th_fmt_param_1);
                return;
              }
              _jspx_tagPool_fmt_param_value_nobody.reuse(_jspx_th_fmt_param_1);
              out.write("\n");
              out.write("            ");
              int evalDoAfterBody = _jspx_th_fmt_message_1.doAfterBody();
              if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
                break;
            } while (true);
            if (_jspx_eval_fmt_message_1 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE)
              out = _jspx_page_context.popBody();
          }
          if (_jspx_th_fmt_message_1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
            _jspx_tagPool_fmt_message_key.reuse(_jspx_th_fmt_message_1);
            return;
          }
          _jspx_tagPool_fmt_message_key.reuse(_jspx_th_fmt_message_1);
          out.write("\n");
          out.write("        </p>\n");
          out.write("\n");
          out.write("        <p>&nbsp;</p>\n");
          out.write("\n");
          out.write("        <div id=\"workArea\">\n");
          out.write("        <div id=\"systemInfoDiv\">\n");
          out.write("            ");

                if (loggedIn && passwordExpires != null) {
            
          out.write("\n");
          out.write("                 <div class=\"info-box\"><p>Your password expires at ");
          out.print(passwordExpires);
          out.write(". Please change by visiting <a href=\"../user/change-passwd.jsp?isUserChange=true&returnPath=../admin/index.jsp\">here</a></p></div>\n");
          out.write("            ");

                }
            				if (loggedIn && serverAdminComponentFound) {
            
          out.write("\n");
          out.write("            <div id=\"result\"></div>\n");
          out.write("            <script type=\"text/javascript\">\n");
          out.write("                jQuery.noConflict();\n");
          out.write("                var refresh;\n");
          out.write("                function refreshStats() {\n");
          out.write("                    var url = \"../server-admin/system_status_ajaxprocessor.jsp\";\n");
          out.write("                    var data = null;\n");
          out.write("                    try {\n");
          out.write("                        jQuery.ajax({\n");
          out.write("                            url: \"../admin/jsp/session-validate.jsp\",\n");
          out.write("                            type: \"GET\",\n");
          out.write("                            dataType: \"html\",\n");
          out.write("                            data: data,\n");
          out.write("                            complete: function(res, status){\n");
          out.write("                                if (res.responseText.search(/----valid----/) != -1) {\n");
          out.write("                                    jQuery(\"#result\").load(url, null, function (responseText, status, XMLHttpRequest) {\n");
          out.write("                                        if (status != \"success\") {\n");
          out.write("                                            stopRefreshStats();\n");
          out.write("                                        }\n");
          out.write("                                    });\n");
          out.write("                                } else {\n");
          out.write("                                    stopRefreshStats();\n");
          out.write("                                }\n");
          out.write("                            }\n");
          out.write("                        });\n");
          out.write("                    } catch (e) {\n");
          out.write("                    } // ignored\n");
          out.write("                }\n");
          out.write("                function stopRefreshStats() {\n");
          out.write("                    if (refresh) {\n");
          out.write("                        clearInterval(refresh);\n");
          out.write("                    }\n");
          out.write("                }\n");
          out.write("                try {\n");
          out.write("                    jQuery(document).ready(function() {\n");
          out.write("                        refreshStats();\n");
          out.write("                        if (document.getElementById('systemInfoDiv').style.display == '') {\n");
          out.write("                            refresh = setInterval(\"refreshStats()\", 6000);\n");
          out.write("                        }\n");
          out.write("                    });\n");
          out.write("                } catch (e) {\n");
          out.write("                } // ignored\n");
          out.write("            </script>\n");
          out.write("            ");

                }
            
          out.write("\n");
          out.write("        </div>\n");
          out.write("        </div>\n");
          out.write("    </div>\n");
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
      out.write('\n');
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
}
