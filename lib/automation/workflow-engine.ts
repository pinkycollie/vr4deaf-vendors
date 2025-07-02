import type { AutomationWorkflow, WorkflowStep, UserProfile, VRMatch } from "./types"
import { AIAutomationEngine } from "./ai-engine"
import { NotificationService } from "./notification-service"
import { AccountProvisioningService } from "./account-service"
import { VRIntegrationService } from "./vr-integration"

export class WorkflowEngine {
  private aiEngine = new AIAutomationEngine()
  private notificationService = new NotificationService()
  private accountService = new AccountProvisioningService()
  private vrIntegration = new VRIntegrationService()

  async startUserJourney(profile: UserProfile): Promise<AutomationWorkflow> {
    const workflow: AutomationWorkflow = {
      id: `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: profile.id,
      type: "vr-matching",
      status: "pending",
      steps: this.createWorkflowSteps(profile),
      currentStep: 0,
      metadata: { profile },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Start execution
    await this.executeWorkflow(workflow)
    return workflow
  }

  private createWorkflowSteps(profile: UserProfile): WorkflowStep[] {
    return [
      {
        id: "step_1",
        name: "AI Profile Analysis",
        type: "ai-analysis",
        status: "pending",
      },
      {
        id: "step_2",
        name: "VR Office Matching",
        type: "ai-analysis",
        status: "pending",
      },
      {
        id: "step_3",
        name: "Account Creation",
        type: "api-call",
        status: "pending",
      },
      {
        id: "step_4",
        name: "VR Office Notification",
        type: "notification",
        status: "pending",
      },
      {
        id: "step_5",
        name: "User Welcome Email",
        type: "notification",
        status: "pending",
      },
      {
        id: "step_6",
        name: "VR Response Monitoring",
        type: "wait",
        status: "pending",
      },
      {
        id: "step_7",
        name: "Funding Decision Processing",
        type: "decision",
        status: "pending",
      },
    ]
  }

  async executeWorkflow(workflow: AutomationWorkflow): Promise<void> {
    try {
      workflow.status = "in-progress"

      for (let i = workflow.currentStep; i < workflow.steps.length; i++) {
        const step = workflow.steps[i]
        workflow.currentStep = i

        await this.executeStep(workflow, step)

        if (step.status === "failed") {
          workflow.status = "failed"
          break
        }

        if (step.status === "requires-intervention") {
          workflow.status = "requires-intervention"
          break
        }
      }

      if (workflow.currentStep >= workflow.steps.length && workflow.status === "in-progress") {
        workflow.status = "completed"
      }

      workflow.updatedAt = new Date()
    } catch (error) {
      console.error("Workflow execution error:", error)
      workflow.status = "failed"
      workflow.metadata.error = error.message
    }
  }

  private async executeStep(workflow: AutomationWorkflow, step: WorkflowStep): Promise<void> {
    const startTime = Date.now()
    step.status = "in-progress"
    step.executedAt = new Date()

    try {
      switch (step.type) {
        case "ai-analysis":
          await this.executeAIAnalysis(workflow, step)
          break
        case "api-call":
          await this.executeAPICall(workflow, step)
          break
        case "notification":
          await this.executeNotification(workflow, step)
          break
        case "decision":
          await this.executeDecision(workflow, step)
          break
        case "wait":
          await this.executeWait(workflow, step)
          break
        default:
          throw new Error(`Unknown step type: ${step.type}`)
      }

      step.status = "completed"
    } catch (error) {
      console.error(`Step ${step.name} failed:`, error)
      step.status = "failed"
      step.error = error.message
    }

    step.duration = Date.now() - startTime
  }

  private async executeAIAnalysis(workflow: AutomationWorkflow, step: WorkflowStep): Promise<void> {
    const profile = workflow.metadata.profile as UserProfile

    switch (step.name) {
      case "AI Profile Analysis":
        const analysis = await this.aiEngine.analyzeUserProfile(profile)
        step.output = analysis
        workflow.metadata.aiAnalysis = analysis
        break

      case "VR Office Matching":
        const matches = await this.aiEngine.findBestVRMatch(profile)
        step.output = matches
        workflow.metadata.vrMatches = matches

        if (matches.length === 0) {
          // No VR matches found, trigger fallback workflow
          workflow.metadata.requiresFallback = true
        }
        break
    }
  }

  private async executeAPICall(workflow: AutomationWorkflow, step: WorkflowStep): Promise<void> {
    const profile = workflow.metadata.profile as UserProfile
    const vrMatches = workflow.metadata.vrMatches as VRMatch[]

    switch (step.name) {
      case "Account Creation":
        const accountRecommendations = await this.aiEngine.generateAccountRecommendations(profile, vrMatches)
        const account = await this.accountService.createAccount(profile, accountRecommendations)
        step.output = account
        workflow.metadata.account = account
        break
    }
  }

  private async executeNotification(workflow: AutomationWorkflow, step: WorkflowStep): Promise<void> {
    const profile = workflow.metadata.profile as UserProfile
    const vrMatches = workflow.metadata.vrMatches as VRMatch[]
    const account = workflow.metadata.account

    switch (step.name) {
      case "VR Office Notification":
        if (vrMatches && vrMatches.length > 0) {
          for (const match of vrMatches.slice(0, 2)) {
            // Notify top 2 matches
            await this.notificationService.notifyVROffice(match, profile)
          }
        }
        break

      case "User Welcome Email":
        await this.notificationService.sendWelcomeEmail(profile, account, vrMatches)
        break
    }
  }

  private async executeDecision(workflow: AutomationWorkflow, step: WorkflowStep): Promise<void> {
    const profile = workflow.metadata.profile as UserProfile

    switch (step.name) {
      case "Funding Decision Processing":
        // Check if VR has responded with funding decision
        const vrResponse = await this.vrIntegration.checkFundingStatus(profile.id)

        if (vrResponse.status === "approved") {
          // Unlock account services
          await this.accountService.unlockServices(workflow.metadata.account.accountId)
          workflow.metadata.fundingApproved = true
        } else if (vrResponse.status === "denied") {
          // Route to fallback services
          await this.routeToFallbackServices(workflow)
          workflow.metadata.fundingDenied = true
        } else {
          // Still pending, continue monitoring
          step.status = "pending"
        }
        break
    }
  }

  private async executeWait(workflow: AutomationWorkflow, step: WorkflowStep): Promise<void> {
    // For VR Response Monitoring, we set up a scheduled check
    // In a real implementation, this would use a job queue
    setTimeout(
      () => {
        this.executeStep(workflow, workflow.steps[workflow.currentStep + 1])
      },
      24 * 60 * 60 * 1000,
    ) // Check daily
  }

  private async routeToFallbackServices(workflow: AutomationWorkflow): Promise<void> {
    const profile = workflow.metadata.profile as UserProfile

    // Determine fallback service based on user interest
    let fallbackService = ""

    if (profile.serviceInterest === "job-seeker") {
      fallbackService = "360 Job Magician"
    } else if (profile.serviceInterest === "self-employment" || profile.serviceInterest === "small-business") {
      fallbackService = "360 Business Magician"
    } else {
      fallbackService = "MBTQ Universe"
    }

    // Create account in fallback service
    await this.accountService.createFallbackAccount(profile, fallbackService)

    // Notify user of alternative pathway
    await this.notificationService.sendFallbackNotification(profile, fallbackService)

    workflow.metadata.fallbackService = fallbackService
  }
}
