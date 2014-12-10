package org.apache.jsp.dialog;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.wso2.carbon.ui.CarbonUIMessage;

public final class display_005fmessages_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("<script type=\"text/javascript\">\n");
      out.write("    var msgId;\n");
      out.write("    ");

    if(request.getParameter("msgId") == null){
    
      out.write("\n");
      out.write("    msgId = '");
      out.print("MSG" + System.currentTimeMillis() + Math.random());
      out.write("';\n");
      out.write("    ");

    } else {
    
      out.write("\n");
      out.write("    msgId = '");
      out.print(request.getParameter("msgId"));
      out.write("';\n");
      out.write("    ");

    }
    
      out.write("\n");
      out.write("</script>\n");
      out.write("\n");

    //First checks whether there is a CarbonUIMessage in the request
    CarbonUIMessage carbonMessage = (CarbonUIMessage) session.getAttribute(CarbonUIMessage.ID);

    if(carbonMessage == null){
        carbonMessage = (CarbonUIMessage) request.getAttribute(CarbonUIMessage.ID);
    } else {
        session.removeAttribute(CarbonUIMessage.ID);
    }

    if (carbonMessage != null) {
        String message = carbonMessage.getMessage();
        String messageType = carbonMessage.getMessageType();
        if (message == null || message.equals("") || messageType == null) {
        } else {
            if (messageType.equals(CarbonUIMessage.INFO)) {

      out.write("\n");
      out.write("            <script type=\"text/javascript\">\n");
      out.write("                jQuery(document).ready(function() {\n");
      out.write("                    if (getCookie(msgId) == null) {\n");
      out.write("                        CARBON.showInfoDialog(\"");
      out.print( carbonMessage.getMessage());
      out.write("\");\n");
      out.write("                        setCookie(msgId, 'true');\n");
      out.write("                    }                    \n");
      out.write("                });\n");
      out.write("\n");
      out.write("            </script>\n");

            } else if (messageType.equals(CarbonUIMessage.WARNING)) {

      out.write("\n");
      out.write("            <script type=\"text/javascript\">\n");
      out.write("                jQuery(document).ready(function() {\n");
      out.write("                    if (getCookie(msgId) == null) {\n");
      out.write("                        CARBON.showWarningDialog(\"");
      out.print( carbonMessage.getMessage());
      out.write("\");\n");
      out.write("                        setCookie(msgId, 'true');\n");
      out.write("                    }\n");
      out.write("                });\n");
      out.write("            </script>\n");

            } else if (messageType.equals(CarbonUIMessage.ERROR)) {

      out.write("\n");
      out.write("            <script type=\"text/javascript\">\n");
      out.write("                jQuery(document).ready(function() {\n");
      out.write("                    if (getCookie(msgId) == null) {\n");
      out.write("                        CARBON.showErrorDialog(\"");
      out.print( carbonMessage.getMessage());
      out.write("\");\n");
      out.write("                        setCookie(msgId, 'true');\n");
      out.write("                    }\n");
      out.write("                });\n");
      out.write("            </script>\n");

            }
        }
    }

      out.write('\n');
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
