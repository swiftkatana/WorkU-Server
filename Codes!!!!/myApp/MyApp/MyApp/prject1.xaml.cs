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
    public partial class prject1 : ContentPage
    {
        string password;
        string userName;
        public prject1()
        {
            InitializeComponent();
            userName = UserName.Text;
            password = Password.Text;
            button.IsVisible = false;
        }

        private void Button_Clicked(object sender, EventArgs e)
        {

            userName = UserName.Text;
            password = Password.Text;
            if (password.Length == 0 || userName.Length == 0)
            { DisplayAlert("not good", "you didnt enter password and username ", "OK"); }
            else if (password.Length >= 7 && userName.Length >= 7) DisplayAlert(" good", "goood you in", "OK");
            else password = null;
        }

        private void Password_Completed(object sender, EventArgs e)
        {
            button.IsVisible = true;
        }
    }
}