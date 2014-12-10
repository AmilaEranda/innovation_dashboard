package org.apache.jsp.admin.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class browser_005fchecker_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
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

      out.write("<noscript>\r\n");
      out.write("<div class=\"something-wrong\">\r\n");
      out.write("\t<div class=\"title\">JavaScript is disabled on your browser</div>\r\n");
      out.write("\t<div class=\"content\">Please enable JavaScript or upgrade to a JavaScript-capable browser to use WSO2 Products.</div>\r\n");
      out.write("</div>\r\n");
      out.write("</noscript>\r\n");
      out.write("<!--[if lte IE 6]>\r\n");
      out.write("<div class=\"something-wrong\">\r\n");
      out.write("\t<div class=\"title\">Did you know that your Internet Explorer is out of date?</div>\r\n");
      out.write("\t<div class=\"content\">To get the best possible experience using our website we recommend that you upgrade to a newer version.</div>\r\n");
      out.write("</div>\r\n");
      out.write("<![endif]-->\r\n");
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
