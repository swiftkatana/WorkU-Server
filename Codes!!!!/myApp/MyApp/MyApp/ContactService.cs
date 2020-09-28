using MyApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MyApp
{
    class ContactService
    {
     static   int index = 0;
      static private  List<Contact> Contacts = new List<Contact>();

        public IEnumerable<Contact> ResantSearches(string filter = null)
        {
            if (String.IsNullOrWhiteSpace(filter)) return Contacts;
            return Contacts.Where(s => s.Name.Contains(filter));
        }
        public void DeleteItem(int id)
        {
            Contacts.Remove(Contacts.Single(s => s.Id == id));
        }
        static public void AddContact(DateTime date ,string firstNAme, string lastName, string stutus = null, string image = null,  string email = null, int phone = 0   )
        {
            Contacts.Add(new Contact { Id = index, Image = image, LastName = lastName, Name = firstNAme, Status=stutus, Email = email, Phone = phone , Date  = date });
            index++;
        }
        static public void UpdateContact(Contact contact, DateTime date, string firstNAme, string lastName, string stutus = null, string image = null, string email = null, int phone = 0 )
        {
            contact.LastName = lastName; contact.Name = firstNAme; contact.Phone = phone; contact.Status = stutus; contact.Email = email; contact.Image = image; contact.Date = date;
        }
    }
}
