"use server"
import { connectDB } from "@/lib/db";
import { ContactModel } from "@/models/contact.model";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export async function createContact (formData) {
    try {
        await connectDB();
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");

        if (!name || !email || !subject || !message) return {
            success: false,
            error: "All field are required"
        };

        const contact = await ContactModel.create({
            name: name.trim(), 
            email: email.trim().toLowerCase(), 
            subject: subject.trim(),
            message: message.trim()
        });

        return {
            success: true,
            message: "Message sent successfully",
            contactId: contact._id.toString()
        }
    } catch (error) {
        console.error("❌Error in create contact: ", error);
        return {
            success: false,
            error: error
        };
    }
};

export async function getContacts () {
    try {
        await connectDB();
        const contacts = await ContactModel.find().sort({ createdAt: -1 }).lean();
        return contacts.map((contact) => ({
            ...contact,
        }));
    } catch (error) {
        console.error("Error in GET contacts: ", error);
        return {
            success: false,
            error: erroe,
            contacts: []
        }
    }
};

export async function updateStatus (contactId, status) {
    try {
        await connectDB();
        await ContactModel.findByIdAndUpdate(contactId, { status });
        revalidateTag("contact-stats");
        return { success: true };
    } catch (error) {
        console.error("Failed to update status: ", error);
        return {
            success: false,
            error: `Failed to update status: ${error}`
        };
    }
};

export async function getContactStats () {
    const getCachedStats = unstable_cache(async () => {
        await connectDB();
        const total = await ContactModel.countDocuments();
        const newStats = await ContactModel.countDocuments({ status: "new" });
        const readStats = await ContactModel.countDocuments({ status: "read" });
        const repliedStats = await ContactModel.countDocuments({ status: "replied" });

        return { total, newStats, readStats, repliedStats };
    }, ["contact-stats"], { tags: ["contact-stats"] });
    return getCachedStats();
};