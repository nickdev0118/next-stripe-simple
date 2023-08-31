'use client'

import '../public/css/login.css'
import React, {useState} from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient('https://uqmhkgcuncofzrgodkwj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxbWhrZ2N1bmNvZnpyZ29ka3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwNzY0ODMsImV4cCI6MjAwNjY1MjQ4M30.54bIT9pPwx2O6Iibv9-NV1w4DZQEfKDzHqESCUK-wTI')

export default function Home() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleInputChange = (event: any) => {
    setEmail(event.target.value);
  };

  const createStripeCustomer = async () => {
      const response = await fetch('http://localhost:3000/api/create-stripe-customer', {
        method: 'POST',
        body: JSON.stringify({ email: email })
      });
      const data = await response.json();
      const { data: profileData } = await supabase.from('profile').insert([{ stripe_customer: data.stripe_customer }]).select()
      if(profileData) {
        router.replace('http://localhost:3000/pricing')
      }
  }

  return (
    <main>
      <div className="text-center">
        <form className="form-login" action="/login" method="post">
          <img
            className="mb-4"
            src="/images/saasbase.png"
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 font-weight-normal text-black">Log in</h1>
          <p className="mb-3 text-black">
            This is a live demo for Mr Abderrahim
          </p>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email address"
            value = {email}
            onChange={handleInputChange}
            required
            autoFocus
          />
          <button className="btn btn-lg btn-primary btn-block" type="button" onClick={createStripeCustomer}>
            Sign up
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; Made by Sergiy. 2023</p>
        </form>
      </div>
    </main>
  )
}
