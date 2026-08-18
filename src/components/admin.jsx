import { useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    // Insert into your 'menu' table (or 'products' table depending on your DB name)
    const { error } = await supabase
      .from("menu")
      .insert([{ name, price: parseFloat(price), image_url: imageUrl }]);

    if (error) {
      setStatusMessage(`Error: ${error.message}`);
    } else {
      setStatusMessage("Success! Item added to menu.");
      setName("");
      setPrice("");
      setImageUrl("");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Admin Panel - Add Menu Item</h2>
      {statusMessage && <p style={{ fontWeight: "bold" }}>{statusMessage}</p>}
      <form
        onSubmit={handleAddItem}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Image URL (from Supabase Storage)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Item"}
        </button>
      </form>
    </div>
  );
}
