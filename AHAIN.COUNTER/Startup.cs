using Microsoft.Owin;
using Owin;
[assembly: OwinStartup(typeof(AHAIN.COUNTER.Startup))]
namespace AHAIN.COUNTER
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {   
            app.MapSignalR();
            ChatHub.Animais = new System.Collections.Generic.List<AHAINFalador>();
        }
    }
}