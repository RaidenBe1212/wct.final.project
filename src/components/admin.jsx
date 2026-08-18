import { useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

export default function Admin() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Espresso Drinks");
  const [origin, setOrigin] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleAddItem = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatusMessage("");

    const { error } = await supabase.from("products").insert([
      {
        name,
        category,
        origin,
        notes,
        price: parseFloat(price),
        image_url: imageUrl || null,
      },
    ]);

    if (error) {
      setStatusMessage(`Error: ${error.message}`);
    } else {
      setStatusMessage("Success! Product added to menu.");

      setName("");
      setCategory("Espresso Drinks");
      setOrigin("");
      setNotes("");
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
      <h2>Admin Panel</h2>

      {statusMessage && <p style={{ fontWeight: "bold" }}>{statusMessage}</p>}

      <form
        onSubmit={handleAddItem}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Espresso Drinks">Espresso Drinks</option>
          <option value="Cold Coffee">Cold Coffee</option>
          <option value="Cold Brew">Cold Brew</option>
          <option value="Tea & Matcha">Tea & Matcha</option>
          <option value="Refreshers">Refreshers</option>
          <option value="Frappuccino">Frappuccino</option>
        </select>

        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />

        <textarea
          placeholder="Tasting Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
        />

        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="url"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
