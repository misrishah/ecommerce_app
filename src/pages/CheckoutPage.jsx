// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './CheckoutPage.css';

// Location data - you can expand this or fetch from an API
const locationData = {
  countries: [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' }
  ],
  states: {
    IN: [
      { code: 'GJ', name: 'Gujarat' },
      { code: 'MH', name: 'Maharashtra' },
      { code: 'KA', name: 'Karnataka' },
      { code: 'TN', name: 'Tamil Nadu' },
      { code: 'DL', name: 'Delhi' },
      { code: 'UP', name: 'Uttar Pradesh' },
      { code: 'WB', name: 'West Bengal' },
      { code: 'RJ', name: 'Rajasthan' }
    ],
    US: [
      { code: 'CA', name: 'California' },
      { code: 'NY', name: 'New York' },
      { code: 'TX', name: 'Texas' },
      { code: 'FL', name: 'Florida' },
      { code: 'IL', name: 'Illinois' }
    ],
    CA: [
      { code: 'ON', name: 'Ontario' },
      { code: 'BC', name: 'British Columbia' },
      { code: 'AB', name: 'Alberta' },
      { code: 'QC', name: 'Quebec' }
    ],
    UK: [
      { code: 'ENG', name: 'England' },
      { code: 'SCT', name: 'Scotland' },
      { code: 'WLS', name: 'Wales' },
      { code: 'NIR', name: 'Northern Ireland' }
    ],
    AU: [
      { code: 'NSW', name: 'New South Wales' },
      { code: 'VIC', name: 'Victoria' },
      { code: 'QLD', name: 'Queensland' },
      { code: 'WA', name: 'Western Australia' }
    ]
  },
  cities: {
    GJ: [
      { code: 'AHM', name: 'Ahmedabad' },
      { code: 'SUR', name: 'Surat' },
      { code: 'VAD', name: 'Vadodara' },
      { code: 'RAJ', name: 'Rajkot' }
    ],
    MH: [
      { code: 'MUM', name: 'Mumbai' },
      { code: 'PUN', name: 'Pune' },
      { code: 'NAG', name: 'Nagpur' },
      { code: 'NAS', name: 'Nashik' }
    ],
    KA: [
      { code: 'BLR', name: 'Bangalore' },
      { code: 'MYS', name: 'Mysore' },
      { code: 'HUB', name: 'Hubli' },
      { code: 'MAN', name: 'Mangalore' }
    ],
    TN: [
      { code: 'CHN', name: 'Chennai' },
      { code: 'COI', name: 'Coimbatore' },
      { code: 'MAD', name: 'Madurai' },
      { code: 'TRI', name: 'Trichy' }
    ],
    DL: [
      { code: 'NDL', name: 'New Delhi' },
      { code: 'GUR', name: 'Gurgaon' },
      { code: 'NOI', name: 'Noida' },
      { code: 'FAR', name: 'Faridabad' }
    ],
    CA: [
      { code: 'LA', name: 'Los Angeles' },
      { code: 'SF', name: 'San Francisco' },
      { code: 'SD', name: 'San Diego' },
      { code: 'SAC', name: 'Sacramento' }
    ],
    NY: [
      { code: 'NYC', name: 'New York City' },
      { code: 'BUF', name: 'Buffalo' },
      { code: 'ROC', name: 'Rochester' },
      { code: 'ALB', name: 'Albany' }
    ],
    TX: [
      { code: 'HOU', name: 'Houston' },
      { code: 'DAL', name: 'Dallas' },
      { code: 'AUS', name: 'Austin' },
      { code: 'SA', name: 'San Antonio' }
    ],
    ON: [
      { code: 'TOR', name: 'Toronto' },
      { code: 'OTT', name: 'Ottawa' },
      { code: 'HAM', name: 'Hamilton' },
      { code: 'LON', name: 'London' }
    ],
    ENG: [
      { code: 'LON', name: 'London' },
      { code: 'MAN', name: 'Manchester' },
      { code: 'BIR', name: 'Birmingham' },
      { code: 'LIV', name: 'Liverpool' }
    ],
    NSW: [
      { code: 'SYD', name: 'Sydney' },
      { code: 'NEW', name: 'Newcastle' },
      { code: 'WOL', name: 'Wollongong' },
      { code: 'CEN', name: 'Central Coast' }
    ]
  }
};

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    zip: Yup.string().matches(/^\d{5,6}$/,'Must be 5-6 digits').required('Zip code is required'),
    cardNumber: Yup.string().matches(/^\d{16}$/, 'Must be 16 digits').required('Card number is required'),
    expiry: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'MM/YY format').required('Expiry is required'),
    cvv: Yup.string().matches(/^\d{3}$/, 'Must be 3 digits').required('CVV is required')
  });

  const handleCountryChange = (countryCode, setFieldValue) => {
    const states = locationData.states[countryCode] || [];
    setAvailableStates(states);
    setAvailableCities([]);
    
    // Reset state and city when country changes
    setFieldValue('state', '');
    setFieldValue('city', '');
  };

  const handleStateChange = (stateCode, setFieldValue) => {
    const cities = locationData.cities[stateCode] || [];
    setAvailableCities(cities);
    
    // Reset city when state changes
    setFieldValue('city', '');
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        <h2>Your Cart</h2>
        {cartItems.map(item => (
          <div key={item.id} className="checkout-item">
            <img src={item.image} alt={item.title} className="checkout-item-image" />
            <div>
              <h4>{item.title}</h4>
              <p>{item.quantity} × ₹{item.price}</p>
            </div>
          </div>
        ))}
        <h3 className="checkout-total">Total: ₹{total.toFixed(2)}</h3>
      </div>

      <Formik
        initialValues={{
          name: '', address: '', email: '', city: '', state: '', country: '', zip: '',
          cardNumber: '', expiry: '', cvv: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Order submitted:', { cartItems, values, total });
          dispatch(clearCart());
          navigate('/order-confirmation', { state: { total, items: cartItems } });
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="checkout-form">
            <h2>Shipping Information</h2>
            
            <div className="form-group">
              <Field name="name" placeholder="FULL NAME" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <Field name="email" placeholder="EMAIL" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <Field name="address" placeholder="ADDRESS" />
              <ErrorMessage name="address" component="div" className="error" />
            </div>

            {/* Country Dropdown */}
            <div className="form-group">
              <Field name="country">
                {({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => {
                      const countryCode = e.target.value;
                      setFieldValue('country', countryCode);
                      handleCountryChange(countryCode, setFieldValue);
                    }}
                    className="form-select"
                  >
                    <option value="">Select Country</option>
                    {locationData.countries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              <ErrorMessage name="country" component="div" className="error" />
            </div>

            {/* State Dropdown */}
            <div className="form-group">
              <Field name="state">
                {({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => {
                      const stateCode = e.target.value;
                      setFieldValue('state', stateCode);
                      handleStateChange(stateCode, setFieldValue);
                    }}
                    disabled={!values.country}
                    className="form-select"
                  >
                    <option value="">Select State</option>
                    {availableStates.map(state => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              <ErrorMessage name="state" component="div" className="error" />
            </div>

            {/* City Dropdown */}
            <div className="form-group">
              <Field name="city">
                {({ field }) => (
                  <select
                    {...field}
                    disabled={!values.state}
                    className="form-select"
                  >
                    <option value="">Select City</option>
                    {availableCities.map(city => (
                      <option key={city.code} value={city.code}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              <ErrorMessage name="city" component="div" className="error" />
            </div>

            <div className="form-group">
              <Field name="zip" placeholder="ZIP CODE" />
              <ErrorMessage name="zip" component="div" className="error" />
            </div>

            <h2>Payment Details</h2>
            <div className="form-group">
              <Field name="cardNumber" placeholder="Card Number" />
              <ErrorMessage name="cardNumber" component="div" className="error" />
            </div>

            <div className="card-row">
              <div className="form-group">
                <Field name="expiry">
                  {({ field, form }) => (
                    <input
                      {...field}
                      maxLength="5"
                      placeholder="MM/YY"
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');

                        if (val.length >= 3) {
                          val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                        }

                        form.setFieldValue('expiry', val);
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="expiry" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field name="cvv" placeholder="CVV" />
                <ErrorMessage name="cvv" component="div" className="error" />
              </div>
            </div>

            <button type="submit" className="pay-btn">Pay ₹{total.toFixed(2)}</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutPage;