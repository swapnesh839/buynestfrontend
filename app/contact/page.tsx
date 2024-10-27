"use client"
import { useState } from 'react'
import {  Mail, Phone, MapPin, Facebook, Twitter, Instagram} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="p-3">
      {/* <header className="bg-[#00B8A9] shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white mr-2 text-2xl">🎧</span>
            <h1 className="text-2xl font-bold text-white">Beatsflex.</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-white text-[#00B8A9] hover:bg-gray-100">Become a Seller</Button>
            <Mail className="w-6 h-6 text-white" />
            <Bell className="w-6 h-6 text-white" />
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
        </div>
      </header> */}

      <main className="bg-white p-3 border shadow rounded-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <Select name="subject" onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#00B8A9] hover:bg-[#00A799] text-white">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-[#00B8A9]" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-[#00B8A9]" />
                  <span>support@beatsflex.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#00B8A9]" />
                  <span>123 Audio Lane, Soundville, MU 54321</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a href="#" className="text-[#00B8A9] hover:text-[#00A799]">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-[#00B8A9] hover:text-[#00A799]">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-[#00B8A9] hover:text-[#00A799]">
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I track my order?</AccordionTrigger>
                    <AccordionContent>
                      You can track your order by logging into your account and visiting the &quot;Order History&quot; section. There, you&apos;ll find a tracking number for each shipped order.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What is your return policy?</AccordionTrigger>
                    <AccordionContent>
                      We offer a 30-day return policy for most items. Products must be in their original condition with all accessories included. Please refer to our Returns page for more details.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on the destination. You can see available shipping options during checkout.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}