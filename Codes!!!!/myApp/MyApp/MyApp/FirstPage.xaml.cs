using System;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MyApp
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FirstPage : ContentPage
    {
        public FirstPage()
        {
            InitializeComponent();


        }

        private int index = 0;
        private string[] quots = { "hey", "i", "Love", "You" };

        private void Button_OnPressed(object sender, EventArgs e)
        {

            if (index < quots.Length)
            {


                quotes.Text = quots[index];
                index++;
            }
            else if (index == quots.Length)
            {
                index = 0;
                quotes.Text = quots[index];
            }

        }
    }
}