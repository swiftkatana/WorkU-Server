using System;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MyApp
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class GridPhone : ContentPage
    {
        void ShowNumbers(string[] num, int numberPress)
        {
            if (index < numbers.Length)
            {
                string nums = null;
                numbers[index] = Convert.ToString(numberPress);
                foreach (var number in numbers)
                {
                    nums = nums + " " + number;
                }
                numberCall.Text = nums;
                index++;
            }
        }
        public GridPhone()
        {
            InitializeComponent();
            numberCall.Text = "0";

        }
        private string[] numbers = new String[10];
        private int index = 0;

        private void _1_OnPressed(object sender, EventArgs e)
        {


            ShowNumbers(numbers, 1);

        }

        private void _2_OnPressed(object sender, EventArgs e)
        {
            ShowNumbers(numbers, 2);
        }

        private void _3_OnPressed(object sender, EventArgs e)
        {
            ShowNumbers(numbers, 3);
        }

        private void _4_OnPressed(object sender, EventArgs e)
        {
            ShowNumbers(numbers, 4);
        }

        private void _5_OnPressed(object sender, EventArgs e)
        {
            ShowNumbers(numbers, 5);
        }

        private void _6_OnPressed(object sender, EventArgs e)
        {
            ShowNumbers(numbers, 6);
        }

        private void _7_OnPressed(object sender, EventArgs e)
        {
            ShowNumbers(numbers, 7);
        }

        private void _8_OnPressed(object sender, EventArgs e)
        {
            ShowNumbers(numbers, 8);
        }

        private void _9_OnPressed(object sender, EventArgs e)
        {
            ShowNumbers(numbers, 9);
        }

        private void _0_OnPressed(object sender, EventArgs e)
        {
            ShowNumbers(numbers, 0);
        }

        private void _Dial_OnPressed(object sender, EventArgs e)
        {
            DisplayAlert("Calling", "Calling", "end calll");
        }
    }
}