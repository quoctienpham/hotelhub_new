// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Chip,
//   Stack,
//   CircularProgress,
//   Divider,
//   Tooltip,
//   IconButton,
// } from "@mui/material";
// import { runAi } from "@/ai/ai";
// import ShuffleIcon from "@mui/icons-material/Shuffle";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import { styles, chipColors, animations } from "./AICategoryGeneratorstyles";

// const AICategoryGenerator = ({ onSelectCategory, onAddCategory }) => {
//   const [loading, setLoading] = useState(false);
//   const [generatedCategories, setGeneratedCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [generationCount, setGenerationCount] = useState(0);
//   const [error, setError] = useState(null);

//   const generateCategories = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const prompt = `Generate 5 completely unique hotel room category names for batch ${
//         generationCount + 1
//       } that would appeal to modern travelers.

//       Guidelines:
//       1. Mix categories for different traveler types (business, families, couples, solo, luxury, budget)
//       2. Vary by room size, view quality, and special amenities
//       3. Use appealing modifiers (Premium, Deluxe, Executive, Cozy, Spacious)
//       4. Include at least one innovative concept (like "Smart Rooms" or "Eco Suites")
//       5. Never repeat categories from previous batches
//       6. Ensure names are clear but distinctive

//       Format requirements:
//       - Comma-separated only
//       - No numbering or bullets
//       - Each category 2-4 words
//       - Example format: "Panorama Luxury Suite, Urban Explorer Pod, Family Bunk Room"`;

//       const response = await runAi(prompt);

//       let categories = response
//         .split(",")
//         .map((cat) => cat.trim())
//         .filter((cat) => cat.length > 0);

//       if (categories.length !== 5) {
//         throw new Error(`Expected 5 categories, got ${categories.length}`);
//       }

//       setGeneratedCategories(categories);
//       setGenerationCount((prev) => prev + 1);
//       setSelectedCategory("");
//     } catch (error) {
//       console.error("AI generation failed:", error);
//       setError("Failed to generate categories. Please try again.");
//       setGeneratedCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = (category) => {
//     setSelectedCategory(category);
//     onSelectCategory(category);
//   };

//   const handleAdd = () => {
//     if (selectedCategory) {
//       onAddCategory(selectedCategory);
//       setSelectedCategory("");
//     }
//   };

//   const clearGenerated = () => {
//     setGeneratedCategories([]);
//     setSelectedCategory("");
//   };

//   return (
//     <Box sx={styles.container}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Box display="flex" alignItems="center" gap={1}>
//           <Typography variant="h6" sx={styles.header}>
//             AI Category Generator
//           </Typography>
//           <Tooltip title="Generates fresh, unique categories each time">
//             <ShuffleIcon
//               fontSize="small"
//               sx={{
//                 color: "#FD79A8",
//                 animation: loading ? "spin 2s linear infinite" : "none",
//                 ...animations.spin,
//               }}
//             />
//           </Tooltip>
//         </Box>
//         {generatedCategories.length > 0 && (
//           <IconButton
//             onClick={clearGenerated}
//             size="small"
//             sx={styles.closeButton}
//           >
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         )}
//       </Box>
//       {/* Button Generate New Categories */}
//       <Button
//         startIcon={!loading && <ShuffleIcon />}
//         variant="contained"
//         onClick={generateCategories}
//         disabled={loading}
//         fullWidth
//         sx={styles.generateButton}
//       >
//         {loading ? (
//           <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
//         ) : (
//           "Generate New Categories"
//         )}
//       </Button>

//       {error && (
//         <Box sx={styles.errorBox}>
//           <Typography variant="body2" sx={styles.errorText}>
//             <CloseIcon fontSize="small" />
//             {error}
//           </Typography>
//         </Box>
//       )}

//       {generatedCategories.length > 0 && (
//         <>
//           <Divider sx={styles.divider} />

//           <Typography variant="subtitle1" sx={styles.suggestionsTitle}>
//             <span style={{ color: "#FD79A8" }}>✦</span> AI Suggestions (Select
//             one):
//           </Typography>

//           <Stack direction="row" sx={styles.chipsContainer}>
//             {generatedCategories.map((category, index) => (
//               <Chip
//                 key={index}
//                 label={category}
//                 onClick={() => handleSelect(category)}
//                 variant={selectedCategory === category ? "filled" : "outlined"}
//                 sx={styles.chip(
//                   chipColors[index % chipColors.length],
//                   selectedCategory === category
//                 )}
//               />
//             ))}
//           </Stack>

//           {/* Button Add to Categories */}
//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               startIcon={<AddIcon />}
//               variant="contained"
//               onClick={handleAdd}
//               disabled={!selectedCategory}
//               sx={styles.addButton}
//             >
//               Add to Categories
//             </Button>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default AICategoryGenerator;

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Chip,
//   Stack,
//   CircularProgress,
//   Divider,
//   Tooltip,
//   IconButton,
//   TextField,
// } from "@mui/material";
// import { runAi } from "@/ai/ai";
// import ShuffleIcon from "@mui/icons-material/Shuffle";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import { styles, chipColors, animations } from "./AICategoryGeneratorstyles";

// const defaultPrompt = (batch) => `
// Generate 5 completely unique hotel room category names for batch ${batch} that would appeal to modern travelers.

// Guidelines:
// 1. Mix categories for different traveler types (business, families, couples, solo, luxury, budget)
// 2. Vary by room size, view quality, and special amenities
// 3. Use appealing modifiers (Premium, Deluxe, Executive, Cozy, Spacious)
// 4. Include at least one innovative concept (like "Smart Rooms" or "Eco Suites")
// 5. Never repeat categories from previous batches
// 6. Ensure names are clear but distinctive

// Format requirements:
// - Comma-separated only
// - No numbering or bullets
// - Each category 2-4 words
// - Example format: "Panorama Luxury Suite, Urban Explorer Pod, Family Bunk Room"
// `;

// const AICategoryGenerator = ({ onSelectCategory, onAddCategory }) => {
//   const [loading, setLoading] = useState(false);
//   const [generatedCategories, setGeneratedCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [generationCount, setGenerationCount] = useState(0);
//   const [error, setError] = useState(null);
//   const [customPrompt, setCustomPrompt] = useState(""); // 🧠 Prompt do admin nhập

//   // 🧩 Hàm sinh danh mục từ AI
//   const generateCategories = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Nếu admin không nhập, dùng prompt mặc định
//       const promptToUse =
//         customPrompt.trim() || defaultPrompt(generationCount + 1);

//       const response = await runAi(promptToUse);

//       // Xử lý kết quả trả về
//       let categories = response
//         .split(",")
//         .map((cat) => cat.trim())
//         .filter((cat) => cat.length > 0);

//       if (categories.length !== 5) {
//         throw new Error(`Expected 5 categories, got ${categories.length}`);
//       }

//       setGeneratedCategories(categories);
//       setGenerationCount((prev) => prev + 1);
//       setSelectedCategory("");
//     } catch (error) {
//       console.error("AI generation failed:", error);
//       setError("Failed to generate categories. Please try again.");
//       setGeneratedCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = (category) => {
//     setSelectedCategory(category);
//     onSelectCategory(category);
//   };

//   const handleAdd = () => {
//     if (selectedCategory) {
//       onAddCategory(selectedCategory);
//       setSelectedCategory("");
//     }
//   };

//   const clearGenerated = () => {
//     setGeneratedCategories([]);
//     setSelectedCategory("");
//   };

//   return (
//     <Box sx={styles.container}>
//       {/* Header */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Box display="flex" alignItems="center" gap={1}>
//           <Typography variant="h6" sx={styles.header}>
//             AI Category Generator
//           </Typography>
//           <Tooltip title="Generates fresh, unique categories each time">
//             <ShuffleIcon
//               fontSize="small"
//               sx={{
//                 color: "#FD79A8",
//                 animation: loading ? "spin 2s linear infinite" : "none",
//                 ...animations.spin,
//               }}
//             />
//           </Tooltip>
//         </Box>
//         {generatedCategories.length > 0 && (
//           <IconButton
//             onClick={clearGenerated}
//             size="small"
//             sx={styles.closeButton}
//           >
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         )}
//       </Box>

//       {/* 🧠 TextField cho prompt động */}
//       <TextField
//         label="Custom AI Prompt"
//         multiline
//         minRows={4}
//         maxRows={8}
//         fullWidth
//         placeholder="Enter your own AI prompt here (optional)..."
//         value={customPrompt}
//         onChange={(e) => setCustomPrompt(e.target.value)}
//         sx={{
//           mb: 2,
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "12px",
//           },
//         }}
//       />

//       {/* Nút sinh danh mục */}
//       <Button
//         startIcon={!loading && <ShuffleIcon />}
//         variant="contained"
//         onClick={generateCategories}
//         disabled={loading}
//         fullWidth
//         sx={styles.generateButton}
//       >
//         {loading ? (
//           <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
//         ) : (
//           "Generate New Categories"
//         )}
//       </Button>

//       {/* Hiển thị lỗi */}
//       {error && (
//         <Box sx={styles.errorBox}>
//           <Typography variant="body2" sx={styles.errorText}>
//             <CloseIcon fontSize="small" /> {error}
//           </Typography>
//         </Box>
//       )}

//       {/* Hiển thị danh mục được AI sinh */}
//       {generatedCategories.length > 0 && (
//         <>
//           <Divider sx={styles.divider} />
//           <Typography variant="subtitle1" sx={styles.suggestionsTitle}>
//             <span style={{ color: "#FD79A8" }}>✦</span> AI Suggestions (Select one):
//           </Typography>

//           <Stack direction="row" sx={styles.chipsContainer}>
//             {generatedCategories.map((category, index) => (
//               <Chip
//                 key={index}
//                 label={category}
//                 onClick={() => handleSelect(category)}
//                 variant={selectedCategory === category ? "filled" : "outlined"}
//                 sx={styles.chip(
//                   chipColors[index % chipColors.length],
//                   selectedCategory === category
//                 )}
//               />
//             ))}
//           </Stack>

//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               startIcon={<AddIcon />}
//               variant="contained"
//               onClick={handleAdd}
//               disabled={!selectedCategory}
//               sx={styles.addButton}
//             >
//               Add to Categories
//             </Button>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default AICategoryGenerator;

// components/AICategoryGenerator.jsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Divider,
  Tooltip,
  IconButton,
  TextField,
} from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { styles, chipColors, animations } from "./AICategoryGeneratorstyles";

export default function AICategoryGenerator({ onAddCategory }) {
  const [loading, setLoading] = useState(false);
  const [generatedCategories, setGeneratedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [generationCount, setGenerationCount] = useState(0);
  const [error, setError] = useState(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [savedPromptLoaded, setSavedPromptLoaded] = useState(false);

  // Load saved prompt on mount
  useEffect(() => {
    async function loadPrompt() {
      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/prompts`);
        if (!r.ok) return;
        const j = await r.json();
        if (j.prompt) setCustomPrompt(j.prompt);
      } catch (err) {
        console.error("Load prompt error", err);
      } finally {
        setSavedPromptLoaded(true);
      }
    }
    loadPrompt();
  }, []);

  const savePromptToDB = async () => {
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/prompts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: customPrompt }),
      });
      if (!r.ok) throw new Error("Save failed");
      alert("Prompt đã được lưu thành công.");
    } catch (err) {
      console.error(err);
      alert("Lưu prompt thất bại.");
    }
  };

  const generateCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      // Call server route, pass generationCount and prompt (optional)
      const r = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/generate-categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ generationCount, prompt: customPrompt }),
        }
      );
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Generate failed");

      let categories = j.text
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      if (categories.length !== 5) {
        // Allow some tolerance: if >0 but !=5, still show with warning
        if (categories.length === 0)
          throw new Error("AI trả về kết quả không hợp lệ.");
        setError(
          `AI returned ${categories.length} items (expected 5). Showing results anyway.`
        );
      }

      setGeneratedCategories(categories);
      setGenerationCount((p) => p + 1);
      setSelectedCategory("");
    } catch (err) {
      console.error("Generate error:", err);
      setError(err.message || "Failed to generate categories");
      setGeneratedCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (cat) => setSelectedCategory(cat);
  const handleAdd = async () => {
    if (!selectedCategory) return;
    try {
      // Example: save to categories collection; replace endpoint as appropriate
      const r = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: selectedCategory }),
      });
      if (!r.ok) {
        const j = await r.json();
        throw new Error(j.error || "Save failed");
      }
      alert("Category saved");
      setSelectedCategory("");
      // optionally refresh category list in parent via callback
      if (onAddCategory) onAddCategory(selectedCategory);
    } catch (err) {
      console.error(err);
      alert("Save category failed");
    }
  };

  const clearGenerated = () => {
    setGeneratedCategories([]);
    setSelectedCategory("");
    setError(null);
  };

  return (
    <Box sx={styles.container}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" sx={styles.header}>
            AI Category Generator
          </Typography>
          <Tooltip title="Generates fresh, unique categories each time">
            <ShuffleIcon
              sx={{
                color: "#FD79A8",
                animation: loading ? "spin 2s linear infinite" : "none",
                ...animations.spin,
              }}
            />
          </Tooltip>
        </Box>
        {generatedCategories.length > 0 && (
          <IconButton
            onClick={clearGenerated}
            size="small"
            sx={styles.closeButton}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <TextField
        label="Prompt (tiếng Việt) — tùy chỉnh"
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        multiline
        minRows={4}
        fullWidth
        placeholder='Ví dụ: "Hãy tạo 5 tên category homestay trải nghiệm..."'
        sx={{ mb: 2 }}
      />
      <Box display="flex" gap={1} mb={2}>
        <Button
          variant="outlined"
          onClick={savePromptToDB}
          disabled={!savedPromptLoaded}
        >
          Lưu prompt
        </Button>
        <Button
          variant="contained"
          onClick={generateCategories}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Generate"}
        </Button>
      </Box>

      {error && (
        <Box sx={styles.errorBox}>
          <Typography sx={styles.errorText}>{error}</Typography>
        </Box>
      )}

      {generatedCategories.length > 0 && (
        <>
          <Divider sx={styles.divider} />
          <Typography variant="subtitle1" sx={styles.suggestionsTitle}>
            ✦ AI Suggestions (chọn 1)
          </Typography>

          <Stack direction="row" sx={styles.chipsContainer}>
            {generatedCategories.map((cat, idx) => (
              <Chip
                key={idx}
                label={cat}
                onClick={() => handleSelect(cat)}
                variant={selectedCategory === cat ? "filled" : "outlined"}
                sx={styles.chip(
                  chipColors[idx % chipColors.length],
                  selectedCategory === cat
                )}
              />
            ))}
          </Stack>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleAdd}
              disabled={!selectedCategory}
            >
              Add to Categories
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}





// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Chip,
//   Stack,
//   CircularProgress,
//   Divider,
//   Tooltip,
//   IconButton,
//   TextField,
// } from "@mui/material";
// import ShuffleIcon from "@mui/icons-material/Shuffle";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import DeleteIcon from "@mui/icons-material/Delete";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import { styles, chipColors, animations } from "./AICategoryGeneratorstyles";

// export default function AICategoryGenerator({ onAddCategory }) {
//   const [loading, setLoading] = useState(false);
//   const [generatedCategories, setGeneratedCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [generationCount, setGenerationCount] = useState(0);
//   const [error, setError] = useState(null);
//   const [customPrompt, setCustomPrompt] = useState("");
//   const [savedPromptLoaded, setSavedPromptLoaded] = useState(false);

//   // 🧩 Load saved prompt on mount
//   useEffect(() => {
//     loadPrompt();
//   }, []);

//   // 🧩 Function: Load prompt from DB
//   async function loadPrompt() {
//     try {
//       const r = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/prompts`);
//       if (!r.ok) return;
//       const j = await r.json();
//       if (j.prompt) setCustomPrompt(j.prompt);
//     } catch (err) {
//       console.error("Load prompt error", err);
//     } finally {
//       setSavedPromptLoaded(true);
//     }
//   }

//   // 🧩 Function: Save prompt to DB
//   const savePromptToDB = async () => {
//     try {
//       const r = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/prompts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: customPrompt }),
//       });
//       if (!r.ok) throw new Error("Save failed");
//       alert("✅ Prompt đã được lưu thành công.");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Lưu prompt thất bại.");
//     }
//   };

//   // 🧩 Function: Delete prompt from DB
//   const deletePromptFromDB = async () => {
//     if (!confirm("Bạn có chắc muốn xóa prompt đã lưu?")) return;
//     try {
//       const r = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/prompts`, {
//         method: "DELETE",
//       });
//       if (!r.ok) throw new Error("Delete failed");
//       setCustomPrompt("");
//       alert("🗑️ Prompt đã được xóa khỏi cơ sở dữ liệu.");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Xóa prompt thất bại.");
//     }
//   };

//   // 🧩 Function: Generate categories
//   const generateCategories = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const r = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/admin/generate-categories`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ generationCount, prompt: customPrompt }),
//         }
//       );
//       const j = await r.json();
//       if (!r.ok) throw new Error(j.error || "Generate failed");

//       let categories = j.text
//         .split(",")
//         .map((c) => c.trim())
//         .filter(Boolean);

//       if (categories.length !== 5) {
//         if (categories.length === 0)
//           throw new Error("AI trả về kết quả không hợp lệ.");
//         setError(
//           `⚠️ AI trả về ${categories.length} category (mong đợi 5). Vẫn hiển thị kết quả.`
//         );
//       }

//       setGeneratedCategories(categories);
//       setGenerationCount((p) => p + 1);
//       setSelectedCategory("");
//     } catch (err) {
//       console.error("Generate error:", err);
//       setError(err.message || "Failed to generate categories");
//       setGeneratedCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🧩 Function: Handle category select
//   const handleSelect = (cat) => setSelectedCategory(cat);

//   // 🧩 Function: Add category to DB
//   const handleAdd = async () => {
//     if (!selectedCategory) return;
//     try {
//       const r = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/categories`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: selectedCategory }),
//       });
//       if (!r.ok) {
//         const j = await r.json();
//         throw new Error(j.error || "Save failed");
//       }
//       alert("✅ Category đã được lưu vào DB");
//       setSelectedCategory("");
//       if (onAddCategory) onAddCategory(selectedCategory);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Lưu category thất bại");
//     }
//   };

//   // 🧩 Function: Clear AI result
//   const clearGenerated = () => {
//     setGeneratedCategories([]);
//     setSelectedCategory("");
//     setError(null);
//   };

//   return (
//     <Box sx={styles.container}>
//       {/* 🔹 Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Box display="flex" alignItems="center" gap={1}>
//           <Typography variant="h6" sx={styles.header}>
//             AI Category Generator
//           </Typography>
//           <Tooltip title="Generates new categories">
//             <ShuffleIcon
//               sx={{
//                 color: "#FD79A8",
//                 animation: loading ? "spin 2s linear infinite" : "none",
//                 ...animations.spin,
//               }}
//             />
//           </Tooltip>
//         </Box>

//         {generatedCategories.length > 0 && (
//           <IconButton onClick={clearGenerated} size="small" sx={styles.closeButton}>
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         )}
//       </Box>

//       {/* 🔹 Prompt field */}
//       <TextField
//         label="Prompt (tiếng Việt)"
//         value={customPrompt}
//         onChange={(e) => setCustomPrompt(e.target.value)}
//         multiline
//         minRows={4}
//         fullWidth
//         placeholder='Ví dụ: "Hãy tạo 5 tên category homestay trải nghiệm..."'
//         sx={{ mb: 2 }}
//       />

//       {/* 🔹 Action buttons */}
//       <Box display="flex" gap={1} mb={2}>
//         <Button variant="outlined" onClick={savePromptToDB} disabled={!savedPromptLoaded}>
//           💾 Lưu prompt
//         </Button>
//         <Button variant="outlined" color="error" onClick={deletePromptFromDB}>
//           🗑️ Xóa prompt
//         </Button>
//         <Button variant="outlined" color="secondary" onClick={loadPrompt}>
//           🔄 Tải lại prompt
//         </Button>
//         <Button variant="contained" onClick={generateCategories} disabled={loading}>
//           {loading ? <CircularProgress size={20} /> : "✨ Generate"}
//         </Button>
//       </Box>

//       {/* 🔹 Error box */}
//       {error && (
//         <Box sx={styles.errorBox}>
//           <Typography sx={styles.errorText}>{error}</Typography>
//         </Box>
//       )}

//       {/* 🔹 AI category suggestions */}
//       {generatedCategories.length > 0 && (
//         <>
//           <Divider sx={styles.divider} />
//           <Typography variant="subtitle1" sx={styles.suggestionsTitle}>
//             ✦ AI Gợi ý (chọn 1)
//           </Typography>

//           <Stack direction="row" sx={styles.chipsContainer}>
//             {generatedCategories.map((cat, idx) => (
//               <Chip
//                 key={idx}
//                 label={cat}
//                 onClick={() => handleSelect(cat)}
//                 variant={selectedCategory === cat ? "filled" : "outlined"}
//                 sx={styles.chip(
//                   chipColors[idx % chipColors.length],
//                   selectedCategory === cat
//                 )}
//               />
//             ))}
//           </Stack>

//           <Box display="flex" justifyContent="flex-end" mt={2}>
//             <Button
//               startIcon={<AddIcon />}
//               variant="contained"
//               onClick={handleAdd}
//               disabled={!selectedCategory}
//             >
//               ➕ Thêm vào DB
//             </Button>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// }
