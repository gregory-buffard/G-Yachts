"use server";

import { Newsletter, NewsletterI } from "@/models/newsletter";
import mongoose from "mongoose";
import { Customer } from "../models/customer";
import { SiteNewsletter } from "@/models/siteNewsletter";
import nodemailer from "nodemailer";

export const createNewsletter = async (newsletter: NewsletterI) => {
    const newsletterInstance = await Newsletter.create(newsletter);

    return { ...newsletterInstance._doc, _id: newsletterInstance._id.toString() };
}

export const updateNewsletterContent = async (id: string, content: string) => {
    const updatedNewsletter = await Newsletter.findByIdAndUpdate(id, { htmlContent: content }, { new: true });
    if (!updatedNewsletter) {
        throw new Error('Newsletter not found');
    }
    return { ...updatedNewsletter._doc, _id: updatedNewsletter._id.toString() };
}

export const getNewsletters = async () => {
    const newsletters = await Newsletter.find().lean();

    return newsletters.map(item => ({
        _id: (item._id as mongoose.Schema.Types.ObjectId).toString(),
        title: item.title,
        htmlContent: item.htmlContent,
        __v: item.__v,
    }));
}

export const sendNewsletter = async (id: string) => {
    const toSendCustomers = await Customer.find({
        where: {
            newsletter: true
        }
    });
    const toSendSubcriptions = await SiteNewsletter.find();
    const newsletter = await Newsletter.findById(id);

    const toSend = toSendCustomers.join(", ").concat(toSendSubcriptions.join(", "));

    const transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: ''
        }
    });

    const mailOptions = {
        from: '',
        to: toSend,
        subject: '',
        html: newsletter.htmlContent
    };

    try {
        transporter.sendMail(mailOptions);
        return 200;
    } catch (err) {
        return 500;
    }
}