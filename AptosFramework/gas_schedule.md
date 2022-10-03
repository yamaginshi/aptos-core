
<a name="0x1_gas_schedule"></a>

# Module `0x1::gas_schedule`

This module defines structs and methods to initialize the gas schedule, which dictates how much
it costs to execute Move on the network.


-  [Struct `GasEntry`](#0x1_gas_schedule_GasEntry)
-  [Resource `GasSchedule`](#0x1_gas_schedule_GasSchedule)
-  [Resource `GasScheduleV2`](#0x1_gas_schedule_GasScheduleV2)
-  [Constants](#@Constants_0)
-  [Function `initialize`](#0x1_gas_schedule_initialize)
-  [Function `set_gas_schedule`](#0x1_gas_schedule_set_gas_schedule)
-  [Function `set_storage_gas_config`](#0x1_gas_schedule_set_storage_gas_config)


<pre><code><b>use</b> <a href="">0x1::error</a>;
<b>use</b> <a href="reconfiguration.md#0x1_reconfiguration">0x1::reconfiguration</a>;
<b>use</b> <a href="storage_gas.md#0x1_storage_gas">0x1::storage_gas</a>;
<b>use</b> <a href="">0x1::string</a>;
<b>use</b> <a href="system_addresses.md#0x1_system_addresses">0x1::system_addresses</a>;
<b>use</b> <a href="util.md#0x1_util">0x1::util</a>;
<b>use</b> <a href="">0x1::vector</a>;
</code></pre>



<a name="0x1_gas_schedule_GasEntry"></a>

## Struct `GasEntry`



<pre><code><b>struct</b> <a href="gas_schedule.md#0x1_gas_schedule_GasEntry">GasEntry</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>key: <a href="_String">string::String</a></code>
</dt>
<dd>

</dd>
<dt>
<code>val: u64</code>
</dt>
<dd>

</dd>
</dl>


</details>

<a name="0x1_gas_schedule_GasSchedule"></a>

## Resource `GasSchedule`



<pre><code><b>struct</b> <a href="gas_schedule.md#0x1_gas_schedule_GasSchedule">GasSchedule</a> <b>has</b> <b>copy</b>, drop, key
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>entries: <a href="">vector</a>&lt;<a href="gas_schedule.md#0x1_gas_schedule_GasEntry">gas_schedule::GasEntry</a>&gt;</code>
</dt>
<dd>

</dd>
</dl>


</details>

<a name="0x1_gas_schedule_GasScheduleV2"></a>

## Resource `GasScheduleV2`



<pre><code><b>struct</b> <a href="gas_schedule.md#0x1_gas_schedule_GasScheduleV2">GasScheduleV2</a> <b>has</b> <b>copy</b>, drop, key
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>feature_version: u64</code>
</dt>
<dd>

</dd>
<dt>
<code>entries: <a href="">vector</a>&lt;<a href="gas_schedule.md#0x1_gas_schedule_GasEntry">gas_schedule::GasEntry</a>&gt;</code>
</dt>
<dd>

</dd>
</dl>


</details>

<a name="@Constants_0"></a>

## Constants


<a name="0x1_gas_schedule_EINVALID_GAS_FEATURE_VERSION"></a>



<pre><code><b>const</b> <a href="gas_schedule.md#0x1_gas_schedule_EINVALID_GAS_FEATURE_VERSION">EINVALID_GAS_FEATURE_VERSION</a>: u64 = 2;
</code></pre>



<a name="0x1_gas_schedule_EINVALID_GAS_SCHEDULE"></a>

The provided gas schedule bytes are empty or invalid


<pre><code><b>const</b> <a href="gas_schedule.md#0x1_gas_schedule_EINVALID_GAS_SCHEDULE">EINVALID_GAS_SCHEDULE</a>: u64 = 1;
</code></pre>



<a name="0x1_gas_schedule_initialize"></a>

## Function `initialize`

Only called during genesis.


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="gas_schedule.md#0x1_gas_schedule_initialize">initialize</a>(aptos_framework: &<a href="">signer</a>, gas_schedule_blob: <a href="">vector</a>&lt;u8&gt;)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="gas_schedule.md#0x1_gas_schedule_initialize">initialize</a>(aptos_framework: &<a href="">signer</a>, gas_schedule_blob: <a href="">vector</a>&lt;u8&gt;) {
    <a href="system_addresses.md#0x1_system_addresses_assert_aptos_framework">system_addresses::assert_aptos_framework</a>(aptos_framework);
    <b>assert</b>!(!<a href="_is_empty">vector::is_empty</a>(&gas_schedule_blob), <a href="_invalid_argument">error::invalid_argument</a>(<a href="gas_schedule.md#0x1_gas_schedule_EINVALID_GAS_SCHEDULE">EINVALID_GAS_SCHEDULE</a>));

    // TODO(Gas): check <b>if</b> gas schedule is consistent
    <b>let</b> <a href="gas_schedule.md#0x1_gas_schedule">gas_schedule</a>: <a href="gas_schedule.md#0x1_gas_schedule_GasScheduleV2">GasScheduleV2</a> = from_bytes(gas_schedule_blob);
    <b>move_to</b>&lt;<a href="gas_schedule.md#0x1_gas_schedule_GasScheduleV2">GasScheduleV2</a>&gt;(aptos_framework, <a href="gas_schedule.md#0x1_gas_schedule">gas_schedule</a>);
}
</code></pre>



</details>

<a name="0x1_gas_schedule_set_gas_schedule"></a>

## Function `set_gas_schedule`

This can be called by on-chain governance to update the gas schedule.


<pre><code><b>public</b> <b>fun</b> <a href="gas_schedule.md#0x1_gas_schedule_set_gas_schedule">set_gas_schedule</a>(aptos_framework: &<a href="">signer</a>, gas_schedule_blob: <a href="">vector</a>&lt;u8&gt;)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="gas_schedule.md#0x1_gas_schedule_set_gas_schedule">set_gas_schedule</a>(aptos_framework: &<a href="">signer</a>, gas_schedule_blob: <a href="">vector</a>&lt;u8&gt;) <b>acquires</b> <a href="gas_schedule.md#0x1_gas_schedule_GasSchedule">GasSchedule</a>, <a href="gas_schedule.md#0x1_gas_schedule_GasScheduleV2">GasScheduleV2</a> {
    <a href="system_addresses.md#0x1_system_addresses_assert_aptos_framework">system_addresses::assert_aptos_framework</a>(aptos_framework);
    <b>assert</b>!(!<a href="_is_empty">vector::is_empty</a>(&gas_schedule_blob), <a href="_invalid_argument">error::invalid_argument</a>(<a href="gas_schedule.md#0x1_gas_schedule_EINVALID_GAS_SCHEDULE">EINVALID_GAS_SCHEDULE</a>));

    <b>if</b> (<b>exists</b>&lt;<a href="gas_schedule.md#0x1_gas_schedule_GasScheduleV2">GasScheduleV2</a>&gt;(@aptos_framework)) {
        <b>let</b> <a href="gas_schedule.md#0x1_gas_schedule">gas_schedule</a> = <b>borrow_global_mut</b>&lt;<a href="gas_schedule.md#0x1_gas_schedule_GasScheduleV2">GasScheduleV2</a>&gt;(@aptos_framework);
        <b>let</b> new_gas_schedule: <a href="gas_schedule.md#0x1_gas_schedule_GasScheduleV2">GasScheduleV2</a> = from_bytes(gas_schedule_blob);
        <b>assert</b>!(new_gas_schedule.feature_version &gt;= <a href="gas_schedule.md#0x1_gas_schedule">gas_schedule</a>.feature_version,
            <a href="_invalid_argument">error::invalid_argument</a>(<a href="gas_schedule.md#0x1_gas_schedule_EINVALID_GAS_FEATURE_VERSION">EINVALID_GAS_FEATURE_VERSION</a>));
        // TODO(Gas): check <b>if</b> gas schedule is consistent
        *<a href="gas_schedule.md#0x1_gas_schedule">gas_schedule</a> = new_gas_schedule;
    }
    <b>else</b> {
        <b>if</b> (<b>exists</b>&lt;<a href="gas_schedule.md#0x1_gas_schedule_GasSchedule">GasSchedule</a>&gt;(@aptos_framework)) {
            _ = <b>move_from</b>&lt;<a href="gas_schedule.md#0x1_gas_schedule_GasSchedule">GasSchedule</a>&gt;(@aptos_framework);
        };
        <b>let</b> new_gas_schedule: <a href="gas_schedule.md#0x1_gas_schedule_GasScheduleV2">GasScheduleV2</a> = from_bytes(gas_schedule_blob);
        // TODO(Gas): check <b>if</b> gas schedule is consistent
        <b>move_to</b>&lt;<a href="gas_schedule.md#0x1_gas_schedule_GasScheduleV2">GasScheduleV2</a>&gt;(aptos_framework, new_gas_schedule);
    };

    // Need <b>to</b> trigger <a href="reconfiguration.md#0x1_reconfiguration">reconfiguration</a> so validator nodes can sync on the updated gas schedule.
    <a href="reconfiguration.md#0x1_reconfiguration_reconfigure">reconfiguration::reconfigure</a>();
}
</code></pre>



</details>

<details>
<summary>Specification</summary>



<pre><code><b>requires</b> <a href="chain_status.md#0x1_chain_status_is_operating">chain_status::is_operating</a>();
</code></pre>



</details>

<a name="0x1_gas_schedule_set_storage_gas_config"></a>

## Function `set_storage_gas_config`



<pre><code><b>public</b> <b>fun</b> <a href="gas_schedule.md#0x1_gas_schedule_set_storage_gas_config">set_storage_gas_config</a>(aptos_framework: &<a href="">signer</a>, config: <a href="storage_gas.md#0x1_storage_gas_StorageGasConfig">storage_gas::StorageGasConfig</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="gas_schedule.md#0x1_gas_schedule_set_storage_gas_config">set_storage_gas_config</a>(aptos_framework: &<a href="">signer</a>, config: StorageGasConfig) {
    <a href="storage_gas.md#0x1_storage_gas_set_config">storage_gas::set_config</a>(aptos_framework, config);
    // Need <b>to</b> trigger <a href="reconfiguration.md#0x1_reconfiguration">reconfiguration</a> so the VM is guaranteed <b>to</b> load the new gas fee starting from the next
    // transaction.
    <a href="reconfiguration.md#0x1_reconfiguration_reconfigure">reconfiguration::reconfigure</a>();
}
</code></pre>



</details>

<details>
<summary>Specification</summary>



<pre><code><b>requires</b> <a href="chain_status.md#0x1_chain_status_is_operating">chain_status::is_operating</a>();
</code></pre>



</details>