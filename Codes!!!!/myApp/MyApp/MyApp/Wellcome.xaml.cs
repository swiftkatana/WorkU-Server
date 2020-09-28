using System;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MyApp
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Wellcome : ContentPage
    {
        public Wellcome()
        {
            InitializeComponent();
         
        }
        AlllyoucanDO alllyoucan = new AlllyoucanDO();
      async  private void Button_OnPressed(object sender, EventArgs e)
        {
         
            await Navigation.PushModalAsync(alllyoucan);
        }

       async private void Button_Clicked(object sender, EventArgs e)
        {
            var res1 = false;
         var res =  await DisplayAlert("I DARE YOU!!!", "ARE YOU SURE??", "yes!!....", "no!!(run away!!)");
            if (res == true)
            {
               res1 =    await DisplayAlert("ARE YOU SURE?", "I HOPE THAT YOU ARE 100% SURE!!", "yes(WOW REALY BRAVE)", "no!!(I KNOW THAT YOU ARE SCRAED!! HAHAHA)");

            }
               if (res1)
        await   Navigation.PushAsync(new DareYou());
        }
    }
}