"use server";

import { Newsletter, NewsletterI } from "@/models/newsletter";

export const createNewsletter = async (newsletter: NewsletterI) => {
    await Newsletter.create(newsletter);
}

export const updateNewsletterContent = async (id: string, content: string) => {
    await Newsletter.findByIdAndUpdate(id, { htmlContent: content });
}

export const getNewsletters = async () => {
    return await Newsletter.find().catch((e) => {
        throw e;
    });
}