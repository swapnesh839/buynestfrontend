""
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Separator } from '@/components/ui/separator'
// import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white p-8">
        {/* <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-[#00A19C]">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-[#00A19C]">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-[#00A19C]">FAQ</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-[#00A19C]">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/shipping" className="text-gray-600 hover:text-[#00A19C]">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-600 hover:text-[#00A19C]">Returns & Exchanges</Link></li>
              <li><Link href="/warranty" className="text-gray-600 hover:text-[#00A19C]">Warranty</Link></li>
              <li><Link href="/support" className="text-gray-600 hover:text-[#00A19C]">Product Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-2">Stay up to date with our latest offers and products.</p>
            <form className="flex">
              <Input type="email" placeholder="Your email" className="rounded-r-none" />
              <Button type="submit" className="rounded-l-none bg-[#00A19C] hover:bg-[#008B87]">
                Subscribe
              </Button>
            </form>
          </div>
        </div> */}
        {/* <Separator className="my-8" /> */}
        <div className="container mx-auto text-center text-gray-600">
          © 2024 Beatsflex. All rights reserved.
        </div>
      </footer>
  )
}

export default Footer