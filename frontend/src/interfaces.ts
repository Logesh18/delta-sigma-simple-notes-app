interface NotesData {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
};

interface FormProps {
    isEdit?: boolean;
    initialTitle?: string;
    initialDescription?: string;
    _id?: string;
};

interface NotesContextProps {
    notes: NotesData[];
    setNotes: React.Dispatch<React.SetStateAction<NotesData[]>>;
    isFormOpen: boolean;
    handleFormClose: any,
    handleFormSubmit: any,
    currentData: FormProps,
    setCurrentData: React.Dispatch<React.SetStateAction<FormProps>>,
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface SearchBarProps {
    onSearch: (query: string) => void;
    searchQuery: string;
};

export  type { NotesData, FormProps, NotesContextProps, SearchBarProps }