
import { PolicyContent } from '../../types';

export const policyContents: { [key: string]: PolicyContent } = {
  shipping: {
    title: 'Shipping Policy',
    htmlContent: `
      <h2>Our Shipping Policy</h2>
      <p>We are committed to delivering your order accurately, in good condition, and always on time.</p>
      <h3>Processing Time</h3>
      <p>Orders are typically processed within 1-2 business days.</p>
      <h3>Shipping Rates & Delivery Estimates</h3>
      <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
      <ul>
        <li><strong>Standard Shipping:</strong> 5-7 business days</li>
        <li><strong>Express Shipping:</strong> 2-3 business days</li>
      </ul>
    `
  },
  returns: {
    title: 'Returns & Exchanges',
    htmlContent: `
      <h2>Returns & Exchanges Policy</h2>
      <p>We accept returns up to 15 days after delivery, if the item is unused and in its original condition, and we will refund the full order amount minus the shipping costs for the return.</p>
      <p>In the event that your order arrives damaged in any way, please email us as soon as possible at support@zainacollection.com with your order number and a photo of the item’s condition.</p>
    `
  },
  sizeGuide: {
    title: 'Size Guide',
    htmlContent: `
      <h2>Zaina Collection Size Guide</h2>
      <p>Find your perfect fit. Measurements are in inches.</p>
      <table style="width:100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px; border: 1px solid #ddd;">Size</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Bust</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Waist</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Hips</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">S</td><td style="padding: 8px; border: 1px solid #ddd;">34-35</td><td style="padding: 8px; border: 1px solid #ddd;">26-27</td><td style="padding: 8px; border: 1px solid #ddd;">36-37</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">M</td><td style="padding: 8px; border: 1px solid #ddd;">36-37</td><td style="padding: 8px; border: 1px solid #ddd;">28-29</td><td style="padding: 8px; border: 1px solid #ddd;">38-39</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">L</td><td style="padding: 8px; border: 1px solid #ddd;">38-40</td><td style="padding: 8px; border: 1px solid #ddd;">30-32</td><td style="padding: 8px; border: 1px solid #ddd;">40-42</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">XL</td><td style="padding: 8px; border: 1px solid #ddd;">41-43</td><td style="padding: 8px; border: 1px solid #ddd;">33-35</td><td style="padding: 8px; border: 1px solid #ddd;">43-45</td></tr>
        </tbody>
      </table>
    `
  }
};
