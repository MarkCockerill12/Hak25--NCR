"use client"

import { useState, useEffect, createContext, useContext } from "react"

// Add this at the top of the file
type UserContextType = {
  user: {
    firstName: string
    lastName: string
    email: string
  }
  updateUser: (data: Partial<UserContextType['user']>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage('user', {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com"
  })

  const updateUser = (data: Partial<typeof user>) => {
    setUser(prev => ({ ...prev, ...data }))
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  // Listen for changes to this local storage key in other tabs/windows
  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    // This function will be called when the localStorage changes in another tab
    function handleStorageChange(event: StorageEvent) {
      if (event.key === key && event.newValue) {
        try {
          // If the key matches and there's a new value, update our state
          setStoredValue(JSON.parse(event.newValue))
        } catch (error) {
          console.log(error)
        }
      }
    }

    // Add event listener
    window.addEventListener("storage", handleStorageChange)

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [key])

  return [storedValue, setValue] as const
}


