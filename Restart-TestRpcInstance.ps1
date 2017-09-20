Param([string] $workingDir = '.', [string]$port, [string]$environmentCode = 'dev', [string]$networkid, [string]$gasLimit = "0x11F9F10", $gasPrice = 500000000 )

# Restarts a TestRPC instance - this can be called during dev/test -OR- as part of a Release (e.g. on a target VM)
# Script is a standalone version of the steps to stop and start testrpc in the VSTS DevOps article here:
# http://truffleframework.com/tutorials/ethereum-devops-truffle-testrpc-vsts

$workingDir = Resolve-Path $workingDir
Write-Host "launching TestRPC for $environmentCode"

$testrpcProcessIdPath = Join-Path $workingDir "testrpcPID.$environmentCode.xml"

if (Test-Path $testrpcProcessIdPath) {
    # Check for any previous testrpc instances (as spawned from a release)
    # Note: If server goes down between releases than a particular process may not exist, ok to ignore

    # retrieve the PID and kill the entire processs tree  
    Get-Content $testrpcProcessIdPath  
    $testrpcPID = Import-CliXml $testrpcProcessIdPath 
    taskkill /pid $testrpcPID /F /T /FI "STATUS eq RUNNING"
}

# Start Test RPC
$startTestrpcProcess = "--network-id=$networkId --port=$port --gasLimit=$gasLimit --gasPrice $gasPrice " + ' -m "good whip lawn just truck shrimp peanut normal clay twice finish alcohol" --account="0x3c2b21d7f3fc82f9c0592637aad2b5ade66a1ffb39f5f5918346d0d6b1cb3d5f,1000000000000000000000000" --account="0x41547a7c702c2dcc8a1d07284e548478367e174e88dbd8997ce92924e42fd052,1000000000000000000000000" --account="0x74a4e4ff7b9700836d0629fafc566496cd3e57dda59c2e403ba34c13d6e9c057,1000000000000000000000000" --account="0x16d91b998ff854ada2f5ab839879ae1823771e11e24301c6f7f2d53944fac638,1000000000000000000000000" --account="0xc26b37fb1a979f90457577246684a01f783225dd295cae1edab6488e0368d40b,1000000000000000000000000" --account="0xcdc010be10b18494f0bf2aaa01425eb42b640fb32fd501e1cfecd45cc47f2c94,1000000000000000000000000"'
$testrpcProcess = Start-Process testrpc $startTestrpcProcess -PassThru

# Keep track of testrpc instance so it can be cleaned up by subsequent releases
$testrpcProcess.Id | Export-CliXml $testrpcProcessIdPath
Get-Content $testrpcProcessIdPath
