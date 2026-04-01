import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building, 
  Briefcase, 
  Award, 
  BookOpen, 
  ClipboardCheck, 
  GraduationCap,
  Users,
  ListTodo,
  CheckSquare,
  Edit,
  Camera
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { studentsData } from "@/data/students";

export function ProfilePage() {
  const { name } = useParams();
  const isPersonal = !name;
  const specialistName = name ? decodeURIComponent(name) : "Alex Johnson";

  const [profile, setProfile] = useState({
    name: specialistName,
    photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${specialistName.replace(/\s+/g, '')}`,
    domain: "Special Educator",
    institution: "Sunrise Inclusive Academy",
    experience: "8 years",
    serviceDomains: [
      "Early Intervention",
      "Academic Intervention",
      "Vocational Support"
    ],
    assessmentMethods: [] // Intentionally empty as requested or mock data
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    domain: "",
    institution: "",
    experience: "",
    serviceDomains: "",
    assessmentMethods: ""
  });

  const handleOpenEdit = () => {
    setEditForm({
      ...profile,
      serviceDomains: profile.serviceDomains.join(", "),
      assessmentMethods: profile.assessmentMethods.join(", ")
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setProfile({
      ...editForm,
      serviceDomains: editForm.serviceDomains.split(",").map(s => s.trim()).filter(Boolean),
      assessmentMethods: editForm.assessmentMethods.split(",").map(s => s.trim()).filter(Boolean)
    });
    setIsModalOpen(false);
  };

  // Calculate statistics based on mapped assigned students
  const { assignedStudents, totalTasks, completedTasks } = useMemo(() => {
    const studentsAssigned = studentsData.filter(s => s.assigned_specialists.includes(specialistName));
    let tTasks = 0;
    let cTasks = 0;
    
    studentsAssigned.forEach(student => {
      if (student.tasks && Array.isArray(student.tasks)) {
        tTasks += student.tasks.length;
        cTasks += student.tasks.filter(t => t.status === "Completed").length;
      }
    });

    return {
      assignedStudents: studentsAssigned.length,
      totalTasks: tTasks,
      completedTasks: cTasks
    };
  }, [specialistName]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">
          Specialist Portfolio
        </h1>
        <p className="text-muted-foreground mt-2">
          {name ? `Professional profile of ${specialistName}` : "Your professional snapshot"}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Left Column - Essential Info */}
        <Card className="col-span-1 border-border bg-card text-card-foreground shadow-sm flex flex-col items-center p-6 text-center relative">
          {isPersonal && (
            <Button onClick={handleOpenEdit} variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
              <Edit className="w-4 h-4" />
            </Button>
          )}
          <div className="relative w-32 h-32 rounded-full border-4 border-border shadow-sm overflow-hidden mb-5 group">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover bg-muted"
            />
            {isPersonal && (
              <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium tracking-wide">Edit</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            )}
          </div>
          <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
          <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary">
            {profile.domain}
          </Badge>

          <Separator className="my-6 w-full" />

          <div className="w-full space-y-4 text-left">
            <div className="flex items-center gap-3 text-foreground">
              <Building className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Institution</p>
                <p className="text-sm font-medium">{profile.institution}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <Briefcase className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="text-sm font-medium">{profile.experience}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Column - Domains & Assessments */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          
          {/* Key Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-border bg-card text-card-foreground shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{assignedStudents}</h3>
                <p className="text-xs text-muted-foreground mt-1">Assigned Students</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card text-card-foreground shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-3">
                  <ListTodo className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{totalTasks}</h3>
                <p className="text-xs text-muted-foreground mt-1">Total Tasks</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card text-card-foreground shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-3">
                  <CheckSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{completedTasks}</h3>
                <p className="text-xs text-muted-foreground mt-1">Completed Tasks</p>
              </CardContent>
            </Card>
          </div>

          {/* Service Domains */}
          <Card className="border-border bg-card text-card-foreground shadow-sm">
            <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1.5">
                <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                  <Award className="w-5 h-5 text-indigo-500" /> 
                  Service Domains
                </CardTitle>
                <CardDescription>Areas of expertise and intervention.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {profile.serviceDomains.map((domain, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-md border border-indigo-100 dark:border-indigo-800/50 text-sm font-medium">
                    <BookOpen className="w-4 h-4" />
                    {domain}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assessment Methods */}
          <Card className="border-border bg-card text-card-foreground shadow-sm">
            <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1.5">
                <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                  <ClipboardCheck className="w-5 h-5 text-emerald-500" /> 
                  Assessment Methods
                </CardTitle>
                <CardDescription>Preferred evaluation and diagnostic tools.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {profile.assessmentMethods.length > 0 ? (
                <ul className="space-y-2">
                  {profile.assessmentMethods.map((method, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      {method}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-muted-foreground border border-dashed border-border rounded-lg bg-muted/50">
                  <GraduationCap className="w-8 h-8 mb-2 opacity-50 text-muted-foreground" />
                  <p className="text-sm italic">No assessment methods currently specified.</p>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Profile Information</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 mt-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="domain" className="text-right">Domain</Label>
              <Input id="domain" value={editForm.domain} onChange={e => setEditForm({...editForm, domain: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="institution" className="text-right">Institution</Label>
              <Input id="institution" value={editForm.institution} onChange={e => setEditForm({...editForm, institution: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">Experience</Label>
              <Input id="experience" value={editForm.experience} onChange={e => setEditForm({...editForm, experience: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="serviceDomains" className="text-right">Service Domains</Label>
              <Input placeholder="Comma separated values" id="serviceDomains" value={editForm.serviceDomains} onChange={e => setEditForm({...editForm, serviceDomains: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assessmentMethods" className="text-right">Assessments</Label>
              <Input placeholder="Comma separated values" id="assessmentMethods" value={editForm.assessmentMethods} onChange={e => setEditForm({...editForm, assessmentMethods: e.target.value})} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
