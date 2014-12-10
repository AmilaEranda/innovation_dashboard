package org.apache.jsp.admin.layout;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.wso2.carbon.CarbonConstants;
import org.wso2.carbon.registry.core.RegistryConstants;
import org.wso2.carbon.ui.CarbonUIUtil;
import java.util.ArrayList;
import java.util.Iterator;
import org.wso2.carbon.utils.multitenancy.MultitenantConstants;
import org.wso2.carbon.base.ServerConfiguration;

public final class template_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_tiles_insertAttribute_name_nobody;
  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_tiles_getAsString_name_nobody;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _jspx_tagPool_tiles_insertAttribute_name_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _jspx_tagPool_tiles_getAsString_name_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _jspx_tagPool_tiles_insertAttribute_name_nobody.release();
    _jspx_tagPool_tiles_getAsString_name_nobody.release();
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
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n");
      out.write("<html xmlns=\"http://www.w3.org/1999/xhtml\">\n");
      out.write("\n");

	//Customization of UI theming per tenant
	String tenantDomain = null;
	String globalCSS = "../admin/css/global.css";
	String mainCSS = "";
	if (request.getSession()
			.getAttribute(MultitenantConstants.TENANT_DOMAIN) != null) {
		tenantDomain = (String) request.getSession().getAttribute(
				MultitenantConstants.TENANT_DOMAIN);
	} else {
		// user is not logged in or just logged out, but still they are inside url own to the domain
		tenantDomain = (String) request
				.getAttribute(MultitenantConstants.TENANT_DOMAIN);
	}
	if (tenantDomain != null && !MultitenantConstants.SUPER_TENANT_DOMAIN_NAME.equals(tenantDomain)) {
        String themeRoot = "../../../../t/" + tenantDomain
				+ "/registry/resource"
				+ RegistryConstants.GOVERNANCE_REGISTRY_BASE_PATH
				+ "/repository";
		mainCSS = themeRoot + "/theme/admin/main.css";
        if (request.getSession().getAttribute(
                CarbonConstants.THEME_URL_RANDOM_SUFFIX_SESSION_KEY) != null) {
            // this random string is used to get the effect of the theme change, where-ever the
            // theme is changed, this session will be changed
            mainCSS += "?rsuffix=" + request.getSession().getAttribute(
                CarbonConstants.THEME_URL_RANDOM_SUFFIX_SESSION_KEY);
        }
    } else {
        if ("true".equals(ServerConfiguration.getInstance().getFirstProperty(CarbonConstants.IS_CLOUD_DEPLOYMENT))) {
            mainCSS = "../../registry/resource"
                      + RegistryConstants.GOVERNANCE_REGISTRY_BASE_PATH
                      + "/repository/components/org.wso2.carbon.all-themes/Default/admin/main.css";
        } else {
            mainCSS = "../styles/css/main.css";
        }
	}
	//read web application's title if it's set on product.xml
    String webAdminConsoleTitle = (String) config.getServletContext().getAttribute(CarbonConstants.PRODUCT_XML_WSO2CARBON +
            CarbonConstants.PRODUCT_XML_WEB_ADMIN_CONSOLE_TITLE);

      out.write("\n");
      out.write("<head>\n");
      out.write("    <meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\"/>\n");
      out.write("    ");
if(webAdminConsoleTitle != null && webAdminConsoleTitle.trim().length() > 0){ 
      out.write("\n");
      out.write("    <title>");
      out.print(webAdminConsoleTitle);
      out.write("</title>\n");
      out.write("    ");
}else{ 
      out.write("\n");
      out.write("    <title>");
      if (_jspx_meth_tiles_getAsString_0(_jspx_page_context))
        return;
      out.write("</title>\n");
      out.write("    ");
}
      out.write("\n");
      out.write("    <link href=\"");
      out.print(globalCSS);
      out.write("\" rel=\"stylesheet\" type=\"text/css\" media=\"all\"/>\n");

	Object param = session.getAttribute("authenticated");
	if (param != null && (Boolean) param) {

      out.write("\n");
      out.write("    <link href=\"../admin/jsp/registry_styles_ajaxprocessor.jsp\" rel=\"stylesheet\" type=\"text/css\"\n");
      out.write("          media=\"all\"/>\n");

	}

      out.write("\n");
      out.write("    <link href=\"");
      out.print(mainCSS);
      out.write("\" rel=\"stylesheet\" type=\"text/css\" media=\"all\"/>\n");
      out.write("    <link href=\"../dialog/css/jqueryui/jqueryui-themeroller.css\" rel=\"stylesheet\" type=\"text/css\"\n");
      out.write("          media=\"all\"/>\n");
      out.write("    <link href=\"../dialog/css/dialog.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\"/>\n");
      out.write("    <link rel=\"stylesheet\" href=\"../admin/css/carbonFormStyles.css\">\n");
      out.write("    <!--[if gte IE 8]>\n");
      out.write("    <link href=\"../dialog/css/dialog-ie8.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\"/>        \n");
      out.write("    <![endif]-->\n");
      out.write("    <!--[if gte IE 7]>\n");
      out.write("    <link href=\"../dialog/css/dialog-ie8.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\"/>\n");
      out.write("    <![endif]-->\n");
      out.write("    <link rel=\"icon\" href=\"../admin/images/favicon.ico\" type=\"image/x-icon\"/>\n");
      out.write("    <link rel=\"shortcut icon\" href=\"../admin/images/favicon.ico\" type=\"image/x-icon\"/>\n");
      out.write("\n");
      out.write("    <script type=\"text/javascript\" src=\"../admin/js/jquery-1.5.2.min.js\"></script>\n");
      out.write("    <script type=\"text/javascript\" src=\"../admin/js/jquery.form.js\"></script>\n");
      out.write("    <script type=\"text/javascript\" src=\"../dialog/js/jqueryui/jquery-ui.min.js\"></script>\n");
      out.write("    <script type=\"text/javascript\" src=\"../admin/js/jquery.validate.js\"></script>    \n");
      out.write("    <script type=\"text/javascript\" src=\"../admin/js/jquery.cookie.js\"></script>\n");
      out.write("    <script type=\"text/javascript\" src=\"../admin/js/jquery.ui.core.min.js\"></script>\n");
      out.write("    <script type=\"text/javascript\" src=\"../admin/js/jquery.ui.widget.min.js\"></script>\n");
      out.write("    <script type=\"text/javascript\" src=\"../admin/js/jquery.ui.tabs.min.js\"></script>\n");
      out.write("    <script type=\"text/javascript\" src=\"../admin/js/main.js\"></script>\n");
      out.write("    <script type=\"text/javascript\" src=\"../admin/js/WSRequest.js\"></script>\n");
      out.write("    <script type=\"text/javascript\" src=\"../admin/js/cookies.js\"></script>\n");
      out.write("\n");
      out.write("    <script type=\"text/javascript\" src=\"../admin/js/customControls.js\"></script>\n");
      out.write("</head>\n");

	//set cookie containing collapsed menu items
	Object o = config.getServletContext().getAttribute(
			CarbonConstants.PRODUCT_XML_WSO2CARBON + "collapsedmenus");
	if (o != null) {
		ArrayList collapsedMenuItems = (ArrayList) o;
		Iterator itrCollapsedMenuItems = collapsedMenuItems.iterator();
		
      out.write("\n");
      out.write("\t\t<script type=\"text/javascript\">\n");
      out.write("\t\t");

		while (itrCollapsedMenuItems.hasNext()) {
			String menuItem = (String) itrCollapsedMenuItems.next();
			out.print("if(getCookie('" + menuItem + "') == null){\n");
			out.print("  setCookie('" + menuItem + "', 'none');\n");
			out.print("}\n");
		}
		
      out.write("\n");
      out.write("\t\t</script>\n");
      out.write("\t\t");

	}

      out.write("\n");
      out.write("<body>\n");
      org.apache.jasper.runtime.JspRuntimeLibrary.include(request, response, "../../admin/jsp/browser_checker.jsp", out, false);
      out.write("\n");
      out.write("<div id=\"dcontainer\"></div>\n");
      out.write("<script type=\"text/javascript\" src=\"../dialog/js/dialog.js\"></script>\n");
      out.write("\n");
      out.write("<!-- JS imports for collapsible menu -->\n");
      out.write("<script src=\"../yui/build/yahoo-dom-event/yahoo-dom-event.js\" type=\"text/javascript\"></script>\n");
      out.write("<script src=\"../yui/build/animation/animation-min.js\" type=\"text/javascript\"></script>\n");
      out.write("<script src=\"../admin/js/template.js\" type=\"text/javascript\"></script>\n");
      out.write("<script src=\"../yui/build/yahoo/yahoo-min.js\" type=\"text/javascript\"></script>\n");
      out.write("<script src=\"../yui/build/selector/selector-min.js\" type=\"text/javascript\"></script>\n");
      out.write("\n");
      out.write("<table id=\"main-table\" border=\"0\" cellspacing=\"0\">\n");
      out.write("    <tr>\n");
      out.write("        <td id=\"header\" colspan=\"3\">");
      if (_jspx_meth_tiles_insertAttribute_0(_jspx_page_context))
        return;
      out.write("\n");
      out.write("        </td>\n");
      out.write("    </tr>\n");
      out.write("    <tr>\n");
      out.write("        <td class=\"vertical-menu-container\" id=\"vertical-menu-container\" style=\"display:none;\">\n");
      out.write("            <div id=\"menu-panel-button0\"></div>\n");
      out.write("            <div id=\"menu-panel-button1\" class=\"menu-panel-buttons\"></div>\n");
      out.write("            <div id=\"menu-panel-button2\" class=\"menu-panel-buttons\"></div>\n");
      out.write("            <div id=\"menu-panel-button3\" class=\"menu-panel-buttons\"></div>\n");
      out.write("            <div id=\"menu-panel-button4\" class=\"menu-panel-buttons\"></div>\n");
      out.write("            <div id=\"menu-panel-button5\" class=\"menu-panel-buttons\"></div>\n");
      out.write("            <div id=\"menu-panel-button_dummy\" style=\"display:none\"></div>\n");
      out.write("        </td>\n");
      out.write("        <td id=\"menu-panel\" valign=\"top\">\n");
      out.write("            <table id=\"menu-table\" border=\"0\" cellspacing=\"0\">\n");
      out.write("                <tr>\n");
      out.write("                    <td id=\"region1\">");
      if (_jspx_meth_tiles_insertAttribute_1(_jspx_page_context))
        return;
      out.write("</td>\n");
      out.write("                </tr>\n");
      out.write("                <tr>\n");
      out.write("                    <td id=\"region2\">");
      if (_jspx_meth_tiles_insertAttribute_2(_jspx_page_context))
        return;
      out.write("</td>\n");
      out.write("                </tr>\n");
      out.write("                <tr>\n");
      out.write("                    <td id=\"region3\">");
      if (_jspx_meth_tiles_insertAttribute_3(_jspx_page_context))
        return;
      out.write("</td>\n");
      out.write("                </tr>\n");
      out.write("                <tr>\n");
      out.write("                    <td id=\"region4\">");
      if (_jspx_meth_tiles_insertAttribute_4(_jspx_page_context))
        return;
      out.write("</td>\n");
      out.write("                </tr>\n");
      out.write("                <tr>\n");
      out.write("                    <td id=\"region5\">");
      if (_jspx_meth_tiles_insertAttribute_5(_jspx_page_context))
        return;
      out.write("</td>\n");
      out.write("                </tr>\n");
      out.write("                <tr>\n");
      out.write("                    <td><img src=\"../admin/images/1px.gif\" width=\"225px\" height=\"1px\"/></td>\n");
      out.write("                </tr>\n");
      out.write("            </table>\n");
      out.write("        </td>\n");
      out.write("        <td id=\"middle-content\">\n");
      out.write("            <table id=\"content-table\" border=\"0\" cellspacing=\"0\">\n");
      out.write("                <tr>\n");
      out.write("                    <td id=\"page-header-links\">");
      if (_jspx_meth_tiles_insertAttribute_6(_jspx_page_context))
        return;
      out.write("</td>\n");
      out.write("                </tr>\n");
      out.write("                <tr>\n");
      out.write("                    <td id=\"body\">\n");
      out.write("                        <img src=\"../admin/images/1px.gif\" width=\"735px\" height=\"1px\"/>\n");
      out.write("                        ");
      if (_jspx_meth_tiles_insertAttribute_7(_jspx_page_context))
        return;
      out.write("\n");
      out.write("                    </td>\n");
      out.write("                </tr>\n");
      out.write("            </table>\n");
      out.write("        </td>\n");
      out.write("    </tr>\n");
      out.write("    <tr>\n");
      out.write("        <td id=\"footer\" colspan=\"3\">");
      if (_jspx_meth_tiles_insertAttribute_8(_jspx_page_context))
        return;
      out.write("</td>\n");
      out.write("    </tr>\n");
      out.write("</table>\n");
      out.write("</body>\n");
      out.write("</html>\n");
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

  private boolean _jspx_meth_tiles_getAsString_0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  tiles:getAsString
    org.apache.tiles.jsp.taglib.GetAsStringTag _jspx_th_tiles_getAsString_0 = (org.apache.tiles.jsp.taglib.GetAsStringTag) _jspx_tagPool_tiles_getAsString_name_nobody.get(org.apache.tiles.jsp.taglib.GetAsStringTag.class);
    _jspx_th_tiles_getAsString_0.setPageContext(_jspx_page_context);
    _jspx_th_tiles_getAsString_0.setParent(null);
    _jspx_th_tiles_getAsString_0.setName("title");
    int[] _jspx_push_body_count_tiles_getAsString_0 = new int[] { 0 };
    try {
      int _jspx_eval_tiles_getAsString_0 = _jspx_th_tiles_getAsString_0.doStartTag();
      if (_jspx_th_tiles_getAsString_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_tiles_getAsString_0[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_tiles_getAsString_0.doCatch(_jspx_exception);
    } finally {
      _jspx_th_tiles_getAsString_0.doFinally();
      _jspx_tagPool_tiles_getAsString_name_nobody.reuse(_jspx_th_tiles_getAsString_0);
    }
    return false;
  }

  private boolean _jspx_meth_tiles_insertAttribute_0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  tiles:insertAttribute
    org.apache.tiles.jsp.taglib.InsertAttributeTag _jspx_th_tiles_insertAttribute_0 = (org.apache.tiles.jsp.taglib.InsertAttributeTag) _jspx_tagPool_tiles_insertAttribute_name_nobody.get(org.apache.tiles.jsp.taglib.InsertAttributeTag.class);
    _jspx_th_tiles_insertAttribute_0.setPageContext(_jspx_page_context);
    _jspx_th_tiles_insertAttribute_0.setParent(null);
    _jspx_th_tiles_insertAttribute_0.setName("header");
    int[] _jspx_push_body_count_tiles_insertAttribute_0 = new int[] { 0 };
    try {
      int _jspx_eval_tiles_insertAttribute_0 = _jspx_th_tiles_insertAttribute_0.doStartTag();
      if (_jspx_th_tiles_insertAttribute_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_tiles_insertAttribute_0[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_tiles_insertAttribute_0.doCatch(_jspx_exception);
    } finally {
      _jspx_th_tiles_insertAttribute_0.doFinally();
      _jspx_tagPool_tiles_insertAttribute_name_nobody.reuse(_jspx_th_tiles_insertAttribute_0);
    }
    return false;
  }

  private boolean _jspx_meth_tiles_insertAttribute_1(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  tiles:insertAttribute
    org.apache.tiles.jsp.taglib.InsertAttributeTag _jspx_th_tiles_insertAttribute_1 = (org.apache.tiles.jsp.taglib.InsertAttributeTag) _jspx_tagPool_tiles_insertAttribute_name_nobody.get(org.apache.tiles.jsp.taglib.InsertAttributeTag.class);
    _jspx_th_tiles_insertAttribute_1.setPageContext(_jspx_page_context);
    _jspx_th_tiles_insertAttribute_1.setParent(null);
    _jspx_th_tiles_insertAttribute_1.setName("region1");
    int[] _jspx_push_body_count_tiles_insertAttribute_1 = new int[] { 0 };
    try {
      int _jspx_eval_tiles_insertAttribute_1 = _jspx_th_tiles_insertAttribute_1.doStartTag();
      if (_jspx_th_tiles_insertAttribute_1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_tiles_insertAttribute_1[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_tiles_insertAttribute_1.doCatch(_jspx_exception);
    } finally {
      _jspx_th_tiles_insertAttribute_1.doFinally();
      _jspx_tagPool_tiles_insertAttribute_name_nobody.reuse(_jspx_th_tiles_insertAttribute_1);
    }
    return false;
  }

  private boolean _jspx_meth_tiles_insertAttribute_2(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  tiles:insertAttribute
    org.apache.tiles.jsp.taglib.InsertAttributeTag _jspx_th_tiles_insertAttribute_2 = (org.apache.tiles.jsp.taglib.InsertAttributeTag) _jspx_tagPool_tiles_insertAttribute_name_nobody.get(org.apache.tiles.jsp.taglib.InsertAttributeTag.class);
    _jspx_th_tiles_insertAttribute_2.setPageContext(_jspx_page_context);
    _jspx_th_tiles_insertAttribute_2.setParent(null);
    _jspx_th_tiles_insertAttribute_2.setName("region2");
    int[] _jspx_push_body_count_tiles_insertAttribute_2 = new int[] { 0 };
    try {
      int _jspx_eval_tiles_insertAttribute_2 = _jspx_th_tiles_insertAttribute_2.doStartTag();
      if (_jspx_th_tiles_insertAttribute_2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_tiles_insertAttribute_2[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_tiles_insertAttribute_2.doCatch(_jspx_exception);
    } finally {
      _jspx_th_tiles_insertAttribute_2.doFinally();
      _jspx_tagPool_tiles_insertAttribute_name_nobody.reuse(_jspx_th_tiles_insertAttribute_2);
    }
    return false;
  }

  private boolean _jspx_meth_tiles_insertAttribute_3(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  tiles:insertAttribute
    org.apache.tiles.jsp.taglib.InsertAttributeTag _jspx_th_tiles_insertAttribute_3 = (org.apache.tiles.jsp.taglib.InsertAttributeTag) _jspx_tagPool_tiles_insertAttribute_name_nobody.get(org.apache.tiles.jsp.taglib.InsertAttributeTag.class);
    _jspx_th_tiles_insertAttribute_3.setPageContext(_jspx_page_context);
    _jspx_th_tiles_insertAttribute_3.setParent(null);
    _jspx_th_tiles_insertAttribute_3.setName("region3");
    int[] _jspx_push_body_count_tiles_insertAttribute_3 = new int[] { 0 };
    try {
      int _jspx_eval_tiles_insertAttribute_3 = _jspx_th_tiles_insertAttribute_3.doStartTag();
      if (_jspx_th_tiles_insertAttribute_3.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_tiles_insertAttribute_3[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_tiles_insertAttribute_3.doCatch(_jspx_exception);
    } finally {
      _jspx_th_tiles_insertAttribute_3.doFinally();
      _jspx_tagPool_tiles_insertAttribute_name_nobody.reuse(_jspx_th_tiles_insertAttribute_3);
    }
    return false;
  }

  private boolean _jspx_meth_tiles_insertAttribute_4(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  tiles:insertAttribute
    org.apache.tiles.jsp.taglib.InsertAttributeTag _jspx_th_tiles_insertAttribute_4 = (org.apache.tiles.jsp.taglib.InsertAttributeTag) _jspx_tagPool_tiles_insertAttribute_name_nobody.get(org.apache.tiles.jsp.taglib.InsertAttributeTag.class);
    _jspx_th_tiles_insertAttribute_4.setPageContext(_jspx_page_context);
    _jspx_th_tiles_insertAttribute_4.setParent(null);
    _jspx_th_tiles_insertAttribute_4.setName("region4");
    int[] _jspx_push_body_count_tiles_insertAttribute_4 = new int[] { 0 };
    try {
      int _jspx_eval_tiles_insertAttribute_4 = _jspx_th_tiles_insertAttribute_4.doStartTag();
      if (_jspx_th_tiles_insertAttribute_4.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_tiles_insertAttribute_4[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_tiles_insertAttribute_4.doCatch(_jspx_exception);
    } finally {
      _jspx_th_tiles_insertAttribute_4.doFinally();
      _jspx_tagPool_tiles_insertAttribute_name_nobody.reuse(_jspx_th_tiles_insertAttribute_4);
    }
    return false;
  }

  private boolean _jspx_meth_tiles_insertAttribute_5(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  tiles:insertAttribute
    org.apache.tiles.jsp.taglib.InsertAttributeTag _jspx_th_tiles_insertAttribute_5 = (org.apache.tiles.jsp.taglib.InsertAttributeTag) _jspx_tagPool_tiles_insertAttribute_name_nobody.get(org.apache.tiles.jsp.taglib.InsertAttributeTag.class);
    _jspx_th_tiles_insertAttribute_5.setPageContext(_jspx_page_context);
    _jspx_th_tiles_insertAttribute_5.setParent(null);
    _jspx_th_tiles_insertAttribute_5.setName("region5");
    int[] _jspx_push_body_count_tiles_insertAttribute_5 = new int[] { 0 };
    try {
      int _jspx_eval_tiles_insertAttribute_5 = _jspx_th_tiles_insertAttribute_5.doStartTag();
      if (_jspx_th_tiles_insertAttribute_5.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_tiles_insertAttribute_5[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_tiles_insertAttribute_5.doCatch(_jspx_exception);
    } finally {
      _jspx_th_tiles_insertAttribute_5.doFinally();
      _jspx_tagPool_tiles_insertAttribute_name_nobody.reuse(_jspx_th_tiles_insertAttribute_5);
    }
    return false;
  }

  private boolean _jspx_meth_tiles_insertAttribute_6(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  tiles:insertAttribute
    org.apache.tiles.jsp.taglib.InsertAttributeTag _jspx_th_tiles_insertAttribute_6 = (org.apache.tiles.jsp.taglib.InsertAttributeTag) _jspx_tagPool_tiles_insertAttribute_name_nobody.get(org.apache.tiles.jsp.taglib.InsertAttributeTag.class);
    _jspx_th_tiles_insertAttribute_6.setPageContext(_jspx_page_context);
    _jspx_th_tiles_insertAttribute_6.setParent(null);
    _jspx_th_tiles_insertAttribute_6.setName("breadcrumb");
    int[] _jspx_push_body_count_tiles_insertAttribute_6 = new int[] { 0 };
    try {
      int _jspx_eval_tiles_insertAttribute_6 = _jspx_th_tiles_insertAttribute_6.doStartTag();
      if (_jspx_th_tiles_insertAttribute_6.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_tiles_insertAttribute_6[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_tiles_insertAttribute_6.doCatch(_jspx_exception);
    } finally {
      _jspx_th_tiles_insertAttribute_6.doFinally();
      _jspx_tagPool_tiles_insertAttribute_name_nobody.reuse(_jspx_th_tiles_insertAttribute_6);
    }
    return false;
  }

  private boolean _jspx_meth_tiles_insertAttribute_7(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  tiles:insertAttribute
    org.apache.tiles.jsp.taglib.InsertAttributeTag _jspx_th_tiles_insertAttribute_7 = (org.apache.tiles.jsp.taglib.InsertAttributeTag) _jspx_tagPool_tiles_insertAttribute_name_nobody.get(org.apache.tiles.jsp.taglib.InsertAttributeTag.class);
    _jspx_th_tiles_insertAttribute_7.setPageContext(_jspx_page_context);
    _jspx_th_tiles_insertAttribute_7.setParent(null);
    _jspx_th_tiles_insertAttribute_7.setName("body");
    int[] _jspx_push_body_count_tiles_insertAttribute_7 = new int[] { 0 };
    try {
      int _jspx_eval_tiles_insertAttribute_7 = _jspx_th_tiles_insertAttribute_7.doStartTag();
      if (_jspx_th_tiles_insertAttribute_7.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_tiles_insertAttribute_7[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_tiles_insertAttribute_7.doCatch(_jspx_exception);
    } finally {
      _jspx_th_tiles_insertAttribute_7.doFinally();
      _jspx_tagPool_tiles_insertAttribute_name_nobody.reuse(_jspx_th_tiles_insertAttribute_7);
    }
    return false;
  }

  private boolean _jspx_meth_tiles_insertAttribute_8(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  tiles:insertAttribute
    org.apache.tiles.jsp.taglib.InsertAttributeTag _jspx_th_tiles_insertAttribute_8 = (org.apache.tiles.jsp.taglib.InsertAttributeTag) _jspx_tagPool_tiles_insertAttribute_name_nobody.get(org.apache.tiles.jsp.taglib.InsertAttributeTag.class);
    _jspx_th_tiles_insertAttribute_8.setPageContext(_jspx_page_context);
    _jspx_th_tiles_insertAttribute_8.setParent(null);
    _jspx_th_tiles_insertAttribute_8.setName("footer");
    int[] _jspx_push_body_count_tiles_insertAttribute_8 = new int[] { 0 };
    try {
      int _jspx_eval_tiles_insertAttribute_8 = _jspx_th_tiles_insertAttribute_8.doStartTag();
      if (_jspx_th_tiles_insertAttribute_8.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (Throwable _jspx_exception) {
      while (_jspx_push_body_count_tiles_insertAttribute_8[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_tiles_insertAttribute_8.doCatch(_jspx_exception);
    } finally {
      _jspx_th_tiles_insertAttribute_8.doFinally();
      _jspx_tagPool_tiles_insertAttribute_name_nobody.reuse(_jspx_th_tiles_insertAttribute_8);
    }
    return false;
  }
}
