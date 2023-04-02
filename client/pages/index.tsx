import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';

interface ContactForm {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
}

export default function Home() {
  const [form, setForm] = useState<ContactForm>({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/api/contact/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <main className={styles.main}>
      <Head>
        <title>Sosyal Düğün</title>
        <meta name="description" content="Sosyal Düğün" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h3 className='text-3xl font-bold p-4'>Sosyal Düğün </h3>
      
      <form className='bg-transparent p-6 rounded-lg text-black flex flex-col w-full' onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="firstname" className="block text-gray-700 font-bold mb-2">
          İsim
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastname" className="block text-gray-700 font-bold mb-2">
          Soyisim
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          E-Posta
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Mesaj
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={5}
        />
      </div>
      <button
        type="submit"
        className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
      >
        Gönder
      </button>
    </form>



    </main>
  )
}

