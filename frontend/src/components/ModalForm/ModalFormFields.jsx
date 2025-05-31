export const AddLibraryFields = [
    {
        key: "library_name",
        label: "Library Name",
        type: "text",
        placeholder: "Enter library name",
        required: true,
    },
    {
        key: "assigned_staff",
        label: "Assigned Staff",
        type: "select",
        placeholder: "Select staff member",
        required: true,
    }
];

export const AddStaffFields = [
    {
        key: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter staff name",
        required: true,
    },
    {
        key: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter staff email",
        required: true,
    }
];

export const AddBorrowerFields = [
    {
        key: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter name",
        required: true,
    },
    {
        key: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email",
        required: true,
    },
    {
        key: "role",
        label: "Role",
        type: "select",
        required: true,
        options: [
            { value: "student", label: "Student" },
            { value: "teacher", label: "Teacher" }
        ]
    }
];

export const AddBookFields = [
    {
        key: "title",
        label: "Title",
        type: "text",
        placeholder: "Enter book title",
        required: true,
    },
    {
        key: "author",
        label: "Author",
        type: "text",
        placeholder: "Enter author name",
        required: true,
    },
    {
        key: "isbn",
        label: "ISBN",
        type: "text",
        placeholder: "Enter ISBN number",
        required: true,
    },
    {
        key: "genre",
        label: "Genre",
        type: "text",
        placeholder: "Enter genre number",
        required: true,
    },
    {
        key: "category",
        label: "Category",
        type: "text",
        placeholder: "Enter category number",
        required: true,
    },
    {
        key: "year_published",
        label: "Published Date",
        type: "text",
        required: true,
    },
    {
        key: "library_id",
        label: "Library Location",
        type: "select",
        placeholder: "Select Library Location",
        required: true,
    }
];