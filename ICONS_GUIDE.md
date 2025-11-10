# 🎨 Using Icons in Edge Templates - Quick Reference

## ✅ Already Installed: Font Awesome

Your `home.edge` already has Font Awesome loaded via CDN:

```edge
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
```

---

## 📝 **How to Use Font Awesome Icons**

### **Basic Syntax:**

```edge
<i class="fas fa-ICON-NAME"></i>
```

### **Icon Types:**

- `fas` - Solid icons (most common)
- `far` - Regular (outline) icons
- `fab` - Brand icons (Twitter, Facebook, etc.)

---

## 🎯 **Common Icons You Can Use**

### **Actions:**

```edge
<i class="fas fa-plus"></i>{{-- Plus/Add --}}
<i class="fas fa-edit"></i>{{-- Edit --}}
<i class="fas fa-trash"></i>{{-- Delete --}}
<i class="fas fa-save"></i>{{-- Save --}}
<i class="fas fa-times"></i>{{-- Close/Cancel --}}
<i class="fas fa-check"></i>{{-- Check/Confirm --}}
<i class="fas fa-search"></i>{{-- Search --}}
<i class="fas fa-filter"></i>{{-- Filter --}}
```

### **Status:**

```edge
<i class="fas fa-check-circle"></i>{{-- Success --}}
<i class="fas fa-times-circle"></i>{{-- Error --}}
<i class="fas fa-exclamation-triangle"></i>{{-- Warning --}}
<i class="fas fa-info-circle"></i>{{-- Info --}}
<i class="fas fa-clock"></i>{{-- Pending --}}
<i class="fas fa-spinner fa-spin"></i>{{-- Loading --}}
```

### **Priority/Direction:**

```edge
<i class="fas fa-arrow-up"></i>{{-- High --}}
<i class="fas fa-arrow-down"></i>{{-- Low --}}
<i class="fas fa-minus"></i>{{-- Medium --}}
<i class="fas fa-star"></i>{{-- Important --}}
```

### **General:**

```edge
<i class="fas fa-user"></i>{{-- User --}}
<i class="fas fa-calendar"></i>{{-- Calendar/Date --}}
<i class="fas fa-tag"></i>{{-- Tag --}}
<i class="fas fa-list"></i>{{-- List --}}
<i class="fas fa-home"></i>{{-- Home --}}
<i class="fas fa-cog"></i>{{-- Settings --}}
<i class="fas fa-heart"></i>{{-- Favorite --}}
```

---

## 💡 **Examples from Your Project**

### **1. Button with Icon:**

```edge
<button class="bg-blue-600 text-white px-4 py-2 rounded">
  <i class="fas fa-plus mr-2"></i>Create New Task
</button>
```

### **2. Conditional Icons:**

```edge
@if(task.isCompleted)
  <i class="fas fa-check-circle text-green-600"></i>Done
@else
  <i class="fas fa-clock text-yellow-600"></i>Pending
@end
```

### **3. Icon with Color:**

```edge
<i class="fas fa-trash text-red-600 hover:text-red-800"></i>
```

### **4. Icon Sizes:**

```edge
<i class="fas fa-heart text-xs"></i>{{-- Extra small --}}
<i class="fas fa-heart text-sm"></i>{{-- Small --}}
<i class="fas fa-heart text-lg"></i>{{-- Large --}}
<i class="fas fa-heart text-2xl"></i>{{-- 2X Large --}}
<i class="fas fa-heart text-4xl"></i>{{-- 4X Large --}}
```

### **5. Spinning/Animated Icons:**

```edge
<i class="fas fa-spinner fa-spin"></i>{{-- Spinning --}}
<i class="fas fa-sync fa-spin"></i>{{-- Rotating --}}
<i class="fas fa-heart fa-beat"></i>{{-- Beating --}}
```

---

## 🎨 **Other Icon Libraries You Can Use**

### **1. Heroicons (Inline SVG)**

```edge
{{-- No CDN needed, just copy SVG --}}
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
</svg>
```

Browse: https://heroicons.com/

### **2. Bootstrap Icons**

```edge
{{-- Add to head --}}
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
/>

{{-- Usage --}}
<i class="bi bi-heart"></i>
<i class="bi bi-trash"></i>
```

Browse: https://icons.getbootstrap.com/

### **3. Material Icons**

```edge
{{-- Add to head --}}
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

{{-- Usage --}}
<span class="material-icons">favorite</span>
<span class="material-icons">delete</span>
```

Browse: https://fonts.google.com/icons

---

## 🔧 **Tailwind CSS + Icons**

### **Spacing:**

```edge
<i class="fas fa-heart mr-2"></i>With right margin
<i class="fas fa-heart ml-2"></i>With left margin
<i class="fas fa-heart mx-2"></i>With horizontal margin
```

### **Colors:**

```edge
<i class="fas fa-heart text-red-500"></i>
<i class="fas fa-check text-green-600"></i>
<i class="fas fa-star text-yellow-500"></i>
<i class="fas fa-info text-blue-600"></i>
```

### **Hover Effects:**

```edge
<i class="fas fa-trash text-gray-400 hover:text-red-600 cursor-pointer"></i>
```

---

## 📋 **Real Examples in Your Code**

Look at `resources/views/pages/home.edge` to see:

1. **Create Button**: `<i class="fas fa-plus mr-2"></i>`
2. **Priority Icons**: `fa-arrow-up`, `fa-arrow-down`, `fa-minus`
3. **Status Icons**: `fa-check-circle`, `fa-clock`
4. **Calendar Icon**: `fa-calendar`

---

## 🎯 **Quick Tips**

✅ **Add spacing**: Use `mr-2` or `ml-2` for space between icon and text  
✅ **Match colors**: Use Tailwind colors like `text-red-600`  
✅ **Size control**: Use `text-sm`, `text-lg`, `text-2xl`  
✅ **Interactive**: Add `cursor-pointer`, `hover:text-blue-600`

---

## 🔍 **Find More Icons**

- Font Awesome: https://fontawesome.com/search
- Search by name: "trash", "edit", "user", etc.
- Copy the class name: `fas fa-ICON-NAME`

---

## ✨ **Pro Example - Icon Button Component**

```edge
{{-- Reusable icon button --}}
<button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  <i class="fas fa-download"></i>
  <span>Download</span>
</button>
```

**Your project is now ready with Font Awesome icons!** 🎉
