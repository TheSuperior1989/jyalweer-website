'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { RefreshCw, Facebook } from 'lucide-react'

export function FacebookSyncButton() {
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    
    try {
      const response = await fetch('/api/sync-facebook', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sync')
      }

      toast.success(data.message || `Successfully synced ${data.synced} memes!`)
    } catch (error) {
      console.error('Sync error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to sync memes from Facebook')
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <Button
      onClick={handleSync}
      disabled={isSyncing}
      className="gap-2"
      variant="outline"
    >
      {isSyncing ? (
        <>
          <RefreshCw className="h-4 w-4 animate-spin" />
          Syncing...
        </>
      ) : (
        <>
          <Facebook className="h-4 w-4" />
          Sync from Facebook
        </>
      )}
    </Button>
  )
}

