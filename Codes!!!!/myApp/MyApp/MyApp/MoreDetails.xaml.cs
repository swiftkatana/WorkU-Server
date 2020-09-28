using MyApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MyApp
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MoreDetails : ContentPage
    {
        bool NewContact = true;
        Contact Contacts;
        public MoreDetails(Contact  contactNow)
        {
           
            InitializeComponent();
            BindingContext = contactNow;
            Phone.Focus();

            if (contactNow == null) NewContact = true;
            else NewContact = false;

            if (NewContact == false)
            {
                Contacts = contactNow;
            Name.Text = contactNow.Name;
            lastName.Text = contactNow.LastName;
            Email.Text = contactNow.Email;
            Phone.Text = contactNow.Phone.ToString();
            Stutus.Text = contactNow.Status;
                Date.Date = contactNow.Date;
                SaveCreate.Text = "Save";
            }
            else if (NewContact == true)
            {
                SaveCreate.Text = "Create new Contact";
            }
           

          
        }

       async private void Button_Clicked(object sender, EventArgs e)
        {
            
            if (String.IsNullOrWhiteSpace(lastName.Text) || String.IsNullOrWhiteSpace(Name.Text)) Eror.IsVisible = true;
            else
            {
                if (NewContact == false)
                {

                    ContactService.UpdateContact(Contacts,Date.Date, Name.Text, lastName.Text, Stutus.Text, null, Email.Text, Convert.ToInt32(Phone.Text) );
                    await Navigation.PushModalAsync(new NewList());
                }
                else
                {
                    if (lastName.Text.Length > 0 && Name.Text.Length > 0)
                    {
                        ContactService.AddContact(Date.Date,Name.Text, lastName.Text, Stutus.Text, null, Email.Text, Convert.ToInt32(Phone.Text));
                        await Navigation.PushModalAsync(new NewList());
                    }
                }
            }
           
           
            
        }
    }
}