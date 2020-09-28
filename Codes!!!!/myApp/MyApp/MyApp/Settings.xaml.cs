using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MyApp
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Settings : ContentPage
    {
        public Settings()
        {
            InitializeComponent();
            if (Application.Current.Properties.ContainsKey("Name"))
             Name.Text = Application.Current.Properties["Name"].ToString();
            if (Application.Current.Properties.ContainsKey("YesOrNo"))
                Yes.On =(bool) Application.Current.Properties["YesOrNo"];
        }

        private void Complate(object sender, EventArgs e)
        {
            Application.Current.Properties["YesOrNo"] = Yes.Text;
            Application.Current.Properties["Name"] = Name.Text;
        }

    }
}