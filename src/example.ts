import { Workflow } from "./types";

export const example: Workflow = {
  title: "Windows 10 Installation Guide for Technical Support Staff",
  steps: [
    {
      type: "info",
      title: "Step 1: Preparation",
      content:
        "Ensure you have a USB drive with at least 8GB of storage. This will be used to create a bootable installer for Windows 10.",
    },
    {
      type: "textbox",
      title: "Step 2: Download the Windows Media Creation Tool",
      content:
        "Visit the official Microsoft website [https://www.microsoft.com/en-us/software-download/windows10](https://www.microsoft.com/en-us/software-download/windows10) and download the 'Windows Media Creation Tool'.",
    },
    {
      type: "info",
      title: "Step 3: Run the Windows Media Creation Tool",
      content:
        "Locate the downloaded file, right-click on it, and select 'Run as administrator'. Follow the prompts to accept the license terms.",
    },
    {
      type: "textbox",
      title:
        "Step 4: Select 'Create installation media (USB flash drive, DVD, or ISO file) for another PC'",
      content:
        "Choose this option if you're creating the installer on a different computer than the one you'll be installing Windows on.",
    },
    {
      type: "textbox",
      title: "Step 5: Choose Language, Edition, and Architecture",
      content:
        "Select your preferred language, Windows 10 edition (usually 'Windows 10'), and the system architecture (32-bit or 64-bit). Click 'Next'.",
    },
    {
      type: "textbox",
      title: "Step 6: Select USB Flash Drive",
      content:
        "Choose your USB drive from the list and click 'Next' to begin creating the bootable installer.",
    },
    {
      type: "info",
      title: "Step 7: Wait for the Process to Complete",
      content:
        "The tool will download Windows 10 and package it into a bootable USB drive. This may take some time depending on your internet speed.",
    },
    {
      type: "info",
      title: "Step 8: Plug in the Installer USB",
      content:
        "Insert the created bootable USB into the target computer where you want to install Windows 10.",
    },
    {
      type: "info",
      title: "Step 9: Boot from the Installer USB",
      content:
        "Restart the target computer and enter the boot menu (usually by pressing F2, F10, F12, or DEL during startup). Select the USB drive as the boot device.",
    },
    {
      type: "info",
      title: "Step 10: Start Installation",
      content:
        "Once the computer boots from the USB, you'll see the 'Windows Setup' screen. Click 'Next'.",
    },
    {
      type: "select",
      title: "Step 11: Choose Installer Language and Other Preferences",
      content:
        "Select your preferred language, time and currency format, and keyboard or input method, then click 'Next'.",
      selectMultiple: false,
      values: ["English", "French", "German", "Spanish", "Japanese"],
    },
    {
      type: "info",
      title: "Step 12: Enter Product Key (if required)",
      content:
        "If prompted, enter your Windows 10 product key. You can also skip this step and add it later.",
    },
    {
      type: "info",
      title: "Step 13: Choose 'Install Now'",
      content: "Click on this option to proceed with the installation.",
    },
    {
      type: "select",
      title: "Step 14: Accept License Terms",
      content: "Check the box to accept the license terms and click 'Next'.",
      selectMultiple: false,
      values: [
        "I accept the license terms",
        "I do not accept the license terms",
      ],
    },
    {
      type: "info",
      title: "Step 15: Choose 'Custom: Install Windows only (advanced)'",
      content:
        "This option allows for a clean install, formatting the entire drive. For other options like upgrading or keeping files, choose accordingly.",
    },
    {
      type: "textbox",
      title: "Step 16: Select Where to Install Windows",
      content:
        "Choose the partition where you want to install Windows 10. If you want a clean install, select the existing partitions and click 'Drive options (advanced)' > 'Delete' to remove all data.",
    },
    {
      type: "info",
      title: "Step 17: Begin Installation",
      content:
        "Click 'Next' to start the installation process. The computer will restart several times during this phase.",
    },
    {
      type: "info",
      title: "Step 18: Set Up Windows",
      content:
        "After the installation is complete, you'll be guided through the initial setup process including connecting to Wi-Fi, setting up a Microsoft account (or signing in with existing credentials), and customizing settings.",
    },
    {
      type: "info",
      title: "Post Installation Instructions",
      content:
        "Ensure all Windows updates are installed. Install necessary drivers for hardware. Set up any required software or applications.",
    },
  ],
};
