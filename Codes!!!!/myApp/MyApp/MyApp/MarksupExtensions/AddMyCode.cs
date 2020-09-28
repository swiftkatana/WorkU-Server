using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace MyApp
{
   public  class AddMyCode
    {
        static public string OnPlatFLor(string android , string ios , string WIndows)
        {
            if (Device.RuntimePlatform == Device.iOS) return ios;
            if (Device.RuntimePlatform == Device.Android) return android;
            if (Device.RuntimePlatform == Device.UWP) return WIndows;
            else return WIndows;
        }

    }
}
