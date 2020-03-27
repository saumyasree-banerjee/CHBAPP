using System;
using System.IdentityModel.Claims;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using CHBApplite.Utilities;

namespace CHBApplite.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            Initialize.Initialization();
            AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.NameIdentifier;
            Microsoft.ApplicationInsights.Extensibility.TelemetryConfiguration.Active.InstrumentationKey =
                System.Web.Configuration.WebConfigurationManager.AppSettings["iKey"];
        }
        void Session_Start(object sender, EventArgs e)
        {
        }

        void Session_End(object sender, EventArgs e)
        {
        }
        protected void Application_Error(object sender, EventArgs args)
        {
            var ex = Server.GetLastError();
            if(ex.StackTrace.Contains("CHBApplite.Web.Areas.Admin"))
                Response.Redirect("../ErrorHandler?errorMessage=" + ex.Message.Replace(Environment.NewLine, " "));
            else
                Response.Redirect("/ErrorHandler?errorMessage=" + ex.Message.Replace(Environment.NewLine, " "));
        }
    }
}
