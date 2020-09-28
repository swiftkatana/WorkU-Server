using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace MyApp.Models
{
  public  class Contact
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public string LastName { get; set; }
        public string Image { get; set; }
        public int Id { get; set; }
        public string Email { get; set; }
        public int Phone { get; set; }
      
        public DateTime Date { get; set; }
        public string FullName()
        {
            
            return String.Format("{0} {1}", Name, LastName);
        }
        public string Age()
        {
            TimeSpan timeSpan = DateTime.Now - Date;
            int age = (int)timeSpan.TotalDays;
            return Convert.ToString(String.Format("{0}", age / 365));
        }
        
    }
}
