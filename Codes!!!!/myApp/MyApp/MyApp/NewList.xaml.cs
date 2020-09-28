using MyApp.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MyApp
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NewList : ContentPage
    {
        List<ContectGroup> contactsGroup;
        ContactService ContactService;
       
        public NewList()
        {
            ImageSource imagefile = ImageSource.FromFile(AddMyCode.OnPlatFLor("Love.png", "Love.png", "Imagess/love.png"));
            ContactService = new ContactService();
            InitializeComponent();
            LastViewList(ContactService.ResantSearches());
            imagess.BackgroundImageSource = imagefile; 
            
        }
         void LastViewList(IEnumerable<Contact> searches)
        {
            contactsGroup = new List<ContectGroup>
            {
                
                new ContectGroup("Contacts", searches)
            };
            listView.ItemsSource = contactsGroup;

            
        }
        private void searchBar_TextChanged(object sender, TextChangedEventArgs e)
        {
            LastViewList(ContactService.ResantSearches(e.NewTextValue));
        }

        private void OnDeleteClicked(object sender, EventArgs e)
        {
            var search = (sender as MenuItem).CommandParameter as Contact;

            contactsGroup[0].Remove(search);
            ContactService.DeleteItem(search.Id);
            LastViewList(ContactService.ResantSearches());
        }

        

     async   private void listView_ItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            if (e.SelectedItem == null) return;
            var contact = e.SelectedItem as Contact;
          
            await Navigation.PushModalAsync(new MoreDetails(contact));
            listView.SelectedItem = null;
        }

        async private void Button_Clicked(object sender, EventArgs e)
        {
            var contact1 = sender as Contact;
            var contact = contact1;
            await Navigation.PushModalAsync(new MoreDetails(contact1));
        }
    }
}