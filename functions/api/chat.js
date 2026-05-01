export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        // 1. Get the user's message from the frontend
        const { message } = await request.json();

        if (!env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ response: "Error: GEMINI_API_KEY is missing in Cloudflare." }), { status: 200 });
        }

        // 2. Fetch your JSON directly from GitHub (The Raw URL you provided earlier)
        const productDataUrl = "https://raw.githubusercontent.com/n8nintegrationai/luvz-collection-dev/refs/heads/main/public/data/products.json";
        const productRes = await fetch(productDataUrl);

        if (!productRes.ok) {
            return new Response(JSON.stringify({ response: "Error: Could not load products from GitHub." }), { status: 200 });
        }

        const fullData = await productRes.json();
        let slimInventory = [];
        const seenProducts = new Set(); // Track unique products to prevent duplicates

        // 3. Robust Category Scanning
        const categories = Object.keys(fullData);
        categories.forEach(cat => {
            if (Array.isArray(fullData[cat])) {
                fullData[cat].slice(0, 15).forEach(item => {
                    // Create a unique key for deduplication (name + category)
                    const productKey = `${cat}:${item.name}`;

                    // Only add if we haven't seen this product before
                    if (!seenProducts.has(productKey)) {
                        seenProducts.add(productKey);
                        slimInventory.push({
                            n: item.name,
                            p: item.price,
                            wa: `https://wa.me/918919359961?text=I%20am%20interested%20in%20${encodeURIComponent(item.name)}`
                        });
                    }
                });
            }
        });

        // 4. Call Gemini 2.5 Flash-Lite (The 2026 Free Tier Stable Model)
        // const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${env.GEMINI_API_KEY}`;
        // const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`;
        const geminiUrl = `http://localhost:8000/chat`;


        const geminiRes = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `System: You are the Luvz Style Assistant, a friendly AI for Luvz Collection, an e-commerce store selling bangles, jhumkas, and traditional jewelry.

POLICIES AND INFO:
- Business Hours: Available 24/7 on WhatsApp
- Shipping: Available across India. For specific shipping charges and timelines, direct customers to WhatsApp
- Returns/Exchange: For queries about returns, exchanges, or refunds, direct to WhatsApp
- Product Info: Use the inventory provided below to help customers
- All inquiries should include the WhatsApp link: https://wa.me/918919359961

IMPORTANT INSTRUCTIONS:
1. Help customers find products from the inventory below
2. Answer product questions (price, description, availability)
3. For policy questions (shipping, returns, delivery time, payments), be helpful but direct them to WhatsApp for detailed information
4. Always be warm, professional, and suggest they connect on WhatsApp for quick responses
5. When suggesting a product, format it as: [Product Name] - ₹[Price]. For WhatsApp links, ALWAYS use markdown format: [Enquire about Product Name](https://wa.me/918919359961?text=Hi%20I%20am%20interested%20in%20Product%20Name)
6. IMPORTANT: Do NOT generate HTML, SVG, or any code. Only use markdown formatting with text and links. The frontend will handle rendering.

INVENTORY: ${JSON.stringify(slimInventory.slice(0, 80))}

User: ${message}`
                    }]
                }]
            })
        });

        const data = await geminiRes.json();

        if (data.error) {
            return new Response(JSON.stringify({ response: "Gemini API Error: " + data.error.message }), { status: 200 });
        }

        const aiText = data.candidates[0].content.parts[0].text;
        return new Response(JSON.stringify({ response: aiText }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        // This sends the actual error to the chat box so we can read it
        return new Response(JSON.stringify({ response: "Crash Report: " + err.message }), { status: 200 });
    }
}