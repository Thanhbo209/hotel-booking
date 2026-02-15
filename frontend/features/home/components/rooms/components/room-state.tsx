export const RoomsLoading = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
    <p className="mt-6 text-muted-foreground font-medium">Loading...</p>
  </div>
);

export const RoomsError = ({ message }: { message: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-destructive">{message}</p>
  </div>
);
