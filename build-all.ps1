$Path = "C:\Pathfinder TT\pf2e-kingmaker-tools"

$proc = Start-Process -FilePath "$Path\gradlew.bat" -ArgumentList "clean" -WorkingDirectory $Path -NoNewWindow -Wait -PassThru
if($proc.ExitCode -ne 0) {
	echo "Aborting the process due to a failure"
	return
}

$proc = Start-Process -FilePath "$Path\gradlew.bat" -ArgumentList "compileOldJs --stacktrace" -WorkingDirectory $Path -NoNewWindow -Wait -PassThru
if($proc.ExitCode -ne 0) {
	echo "Aborting the process due to a failure"
	return
}

$proc = Start-Process -FilePath "$Path\gradlew.bat" -ArgumentList "copyOldJs" -WorkingDirectory $Path -NoNewWindow -Wait -PassThru
if($proc.ExitCode -ne 0) {
	echo "Aborting the process due to a failure"
	return
}

$proc = Start-Process -FilePath "$Path\gradlew.bat" -ArgumentList "build --stacktrace" -WorkingDirectory $Path -NoNewWindow -Wait -PassThru
if($proc.ExitCode -ne 0) {
	echo "Aborting the process due to a failure"
	return
}